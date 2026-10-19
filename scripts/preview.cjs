// Dependency-free preview (caches the official framework on first launch) of the actual Liquid markup and Serverless code.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');
const root = path.join(__dirname, '..');
const src = path.join(root, 'TRMNL/src');
const context = vm.createContext({ Date, Intl });
vm.runInContext(fs.readFileSync(path.join(src, 'transform.js'), 'utf8'), context);
const characters = vm.runInContext('P1_NAMES', context);
const devices = { og: [800,480], x: [1872,1404], portrait: [1404,1872] };
const frameworkVersion = '3.4.3';
const assetRoot = path.join(root, '.cache/framework', frameworkVersion);
const layouts = ['full','half_horizontal','half_vertical','quadrant'];
const base = Date.parse('2026-10-18T09:00:00Z') / 60000;
const escape = text => String(text ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
function fixture(character = 'mametchi', mood = 'awake', seed = 42) {
  const s = context.newLife(seed, base, 'Europe/Madrid');
  s.cursor += 7 * 1440;
  const index = characters.indexOf(character);
  s.character = index >= 0 ? index : 5;
  s.hunger = 15; s.happiness = 11; s.activity_until = 0;
  if (character === 'dead') context.die(s, 'Reached the end of this life');
  if (['sleeping','sleeping-poop'].includes(mood)) s.sleeping = true;
  if (['poop','poop-discipline','sleeping-poop'].includes(mood)) s.poop = 1;
  if (['discipline','poop-discipline'].includes(mood)) s.timers.scold = 1;
  if (mood === 'sick') s.sick = true;
  if (mood === 'timezone-unavailable') { s.timezone = 'UTC'; s.timezone_fallback = true; }
  return s;
}
function render(options = {}, state) {
  const device = devices[options.device] ? options.device : 'og';
  const layout = layouts.includes(options.layout) ? options.layout : 'full';
  const [dw,dh] = devices[device];
  const scale = device === 'og' ? 1 : 1.8;
  const [lw,lh] = [dw / scale,dh / scale];
  const width = layout === 'full' ? dw : (layout === 'half_vertical' || layout === 'quadrant' ? (lw - 20) / 2 - 5 : lw - 20) * scale;
  const height = layout === 'full' ? dh : (layout === 'half_horizontal' || layout === 'quadrant' ? (lh - 20) / 2 - 5 : lh - 20) * scale;
  const s = state || fixture(options.character, options.mood);
  const pet = context.displayPet(s,s.cursor);
  const markup = fs.readFileSync(path.join(src,layout+'.liquid'),'utf8');
  // Render shared SVG captures and escaped fields used by the templates.
  const sharedSource = fs.readFileSync(path.join(src,'shared.liquid'),'utf8');
  const captures = {};
  const shared = sharedSource.replace(/{%-?\s*capture (\w+)\s*-?%}([\s\S]*?){%-?\s*endcapture\s*-?%}/g,(_,name,value) => {
    captures[name] = value.trim(); return '';
  }).replace(/{% comment %}[\s\S]*?{% endcomment %}/g,'');
  const content = markup.replace(/{{\s*(\w+)\s*}}/g, (_,name) => {
    if (!captures[name]) throw Error(`Missing shared capture: ${name}`);
    return captures[name];
  }).replace(/{{\s*pet\.(\w+)\s*\|\s*escape\s*}}/g, (_,key) => escape(pet[key]));
  if (/{[{%]/.test(shared+content)) throw Error('Unsupported Liquid syntax in preview');
  const screenClass = device === 'og' ? 'screen--og screen--1bit' : `screen--v2 screen--4bit${device === 'portrait' ? ' screen--portrait' : ''}`;
  const mashup = {half_horizontal:'1Tx1B',half_vertical:'1Lx1R',quadrant:'2x2'}[layout];
  const view = `<div class="view view--${layout}">${content}</div>`;
  const surface = mashup ? `<div class="mashup mashup--${mashup}">${view}</div>` : view;
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>${escape(pet.name)} · TRMNLGotchi preview</title>
<link rel="stylesheet" href="/framework/css/plugins.css">
<style>/* Preview host only: clip one native view from the device canvas. */ html,body{margin:0;padding:0;width:${width}px;height:${height}px;overflow:hidden;background:white} .screen{position:absolute;left:${layout === 'full' ? 0 : -10 * scale}px;top:${layout === 'full' ? 0 : -10 * scale}px}</style>
${shared}<body class="trmnl"><div class="screen ${screenClass}">${surface}</div></body></html>`;
  return {html,width,height,pet};
}
const app = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>TRMNLGotchi · preview</title>
<style>*{box-sizing:border-box}body{margin:0;background:#f3f3ef;color:#161813;font:14px system-ui,sans-serif}.toolbar{padding:24px 28px;background:#fff;border-bottom:1px solid #d8dad2;display:flex;flex-wrap:wrap;align-items:end;gap:16px}.heading{margin-right:auto}.heading h1{font-size:20px;margin:0 0 6px}.heading p{margin:0;color:#555}label{display:grid;gap:6px;font-size:12px}select,button,input{font:inherit;background:white;border:1px solid #aaa;border-radius:5px;padding:9px}button{cursor:pointer}button:hover{background:#e7e9df}.simulation{display:flex;align-items:center;gap:10px;padding:15px 28px;flex-wrap:wrap}.simulation span{margin-right:auto;color:#555}.preview-wrap{padding:18px 28px;overflow:hidden}.preview-frame{position:relative;margin:auto;box-shadow:0 8px 32px #0002;border:1px solid #d0d2c9;background:#fff}iframe{display:block;border:0;transform-origin:top left}details{margin:15px 28px}pre{background:white;padding:18px;white-space:pre-wrap;font-size:12px}footer{margin:20px 28px;color:#555;font-size:12px}</style>
<div class="toolbar"><div class="heading"><h1>TRMNLGotchi</h1><p>Your nostalgic friend on TRMNL!</p></div>
<label>Device<select id="device"><option value="og">TRMNL OG · 800 × 480</option><option value="x">TRMNL X · landscape</option><option value="portrait">TRMNL X · portrait</option></select></label>
<label>Layout<select id="layout">${layouts.map(x=>`<option>${x}</option>`).join('')}</select></label>
<label>Character<select id="character"><option value="simulation">Seeded lifecycle</option>${[...characters,'dead'].map(x=>`<option ${x==='mametchi'?'selected':''}>${x}</option>`).join('')}</select></label>
<label>Display state<select id="mood"><option value="awake">Awake</option><option value="poop">Needs cleaning</option><option value="discipline">Discipline call</option><option value="poop-discipline">Cleaning + discipline</option><option value="sleeping">Sleeping</option><option value="sleeping-poop">Sleeping + poop</option><option value="sick">Unwell</option><option value="timezone-unavailable">Time zone unavailable</option></select></label></div>
<div class="simulation"><span id="caption">Artwork preview. Choose Seeded lifecycle to watch a real simulation.</span><button id="step15">+15 minutes</button><button id="step360">+6 hours</button><button id="step1440">+1 day</button><button id="reset">New seed</button></div>
<main class="preview-wrap"><div class="preview-frame" id="holder"><iframe id="screen" title="TRMNL display"></iframe></div></main>
<details><summary>Saved state and recent events</summary><pre id="state"></pre></details>
<footer>Changing the preview does not touch your TRMNL installation. Run-time code makes no network requests.</footer>
<script>
let saved,dimensions,seed=42;const $=id=>document.getElementById(id);
function resize(){if(!dimensions)return;const scale=Math.min(1,(innerWidth-58)/dimensions.width,(innerHeight-255)/dimensions.height);$('holder').style.width=dimensions.width*scale+'px';$('holder').style.height=dimensions.height*scale+'px';$('screen').style.width=dimensions.width+'px';$('screen').style.height=dimensions.height+'px';$('screen').style.transform='scale('+scale+')'}
async function update(minutes=0,reset=false){const lifecycle=$('character').value==='simulation';const response=await fetch('/render',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({device:$('device').value,layout:$('layout').value,character:$('character').value,mood:$('mood').value,lifecycle,minutes,state:reset?null:saved,seed})});if(!response.ok){$('caption').textContent=await response.text();return}const data=await response.json();if(lifecycle)saved=data.state;dimensions=data;$('screen').srcdoc=data.html;$('state').textContent=JSON.stringify(data.state,null,2);$('caption').textContent=lifecycle?'Simulation: '+data.pet.updated_at+' · '+data.pet.caretaker+' caretaker · '+data.pet.status:'Artwork preview · '+data.pet.name+' · '+data.width+' × '+data.height;resize()}
for(const id of ['device','layout','character','mood'])$(id).addEventListener('change',()=>update());for(const n of [15,360,1440])$('step'+n).addEventListener('click',()=>{if($('character').value!=='simulation'){$('character').value='simulation'}update(n)});$('reset').addEventListener('click',()=>{seed++;saved=null;$('character').value='simulation';update(0,true)});addEventListener('resize',resize);update();
</script></html>`;
function server() {
  return http.createServer(async (req,res) => {
    const url=new URL(req.url,'http://localhost');
    try {
      const asset = url.pathname === '/framework/css/plugins.css' ? 'css/plugins.css' :
        /^\/fonts\/[\w.-]+$/.test(url.pathname) ? url.pathname.slice(1) : null;
      if(req.method==='GET' && asset) {
        res.setHeader('Content-Type',asset.endsWith('.css') ? 'text/css' : 'font/woff2');
        res.end(fs.readFileSync(path.join(assetRoot,asset)));return;
      }
      if(req.method==='GET' && url.pathname==='/') {res.setHeader('Content-Type','text/html; charset=utf-8');res.end(app);return;}
      if(req.method==='GET' && url.pathname==='/screen') {res.setHeader('Content-Type','text/html; charset=utf-8');res.end(render(Object.fromEntries(url.searchParams)).html);return;}
      if(req.method==='POST' && url.pathname==='/render') {
        let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>16384)throw Error('Preview request too large');}
        const opts=JSON.parse(raw);let state;
        if(opts.lifecycle){
          state=opts.state || context.newLife(Number(opts.seed)>>>0,base,'Europe/Madrid');
          const minutes=Number(opts.minutes || 0);
          if(!Number.isSafeInteger(minutes)||minutes<0||minutes>120000)throw Error('Invalid preview time step');
          state=context.advance(state,state.cursor+minutes);
        }else state=fixture(opts.character,opts.mood,Number(opts.seed)>>>0);
        const data=render(opts,state);res.setHeader('Content-Type','application/json');res.end(JSON.stringify({...data,state}));return;
      }
      res.writeHead(404);res.end('Not found');
    }catch(error){res.writeHead(400,{'Content-Type':'text/plain'});res.end(error.message);}
  });
}
if(require.main===module) {
  require('node:child_process').execFileSync('python3',[path.join(__dirname,'preview-assets.py'),assetRoot,frameworkVersion],{stdio:'inherit'});
  server().listen(8766,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:8766'));
}
module.exports={render,fixture,server,devices,layouts};
