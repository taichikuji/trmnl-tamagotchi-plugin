// Dependency-free preview of the Liquid subset used by this plugin.
// TRMNL itself renders these templates with trmnl-liquid. Reject unsupported
// syntax here, and keep each render's variables isolated as Liquid does.
const escape = text => String(text ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

function renderLiquid(source, variables) {
  const templates = new Map();
  function value(expression, scope, optional = false) {
    if (/^(['"])[\s\S]*\1$/.test(expression)) return expression.slice(1, -1);
    if (expression === 'true') return true;
    if (expression === 'false') return false;
    if (!/^\w+(?:\.\w+)*$/.test(expression)) throw Error(`Unsupported Liquid value: ${expression}`);
    const result = expression.split('.').reduce((object, key) => Object.hasOwn(object ?? {}, key) ? object[key] : undefined, scope);
    if (result === undefined && !optional) throw Error(`Missing Liquid variable: ${expression}`);
    return result;
  }
  function fragment(markup, scope, depth = 0) {
    if (depth > 16) throw Error('Liquid render nesting is too deep');
    markup = markup.replace(/\s*{%-/g, '{%').replace(/-%}\s*/g, '%}')
      .replace(/\s*{{-/g, '{{').replace(/-}}\s*/g, '}}');
    // Consume source in one pass; never interpret Liquid-looking text from data.
    const tokens = /{%\s*comment\s*%}[\s\S]*?{%\s*endcomment\s*%}|{%\s*(?<block>capture|template|unless)\s+(?<name>\w+)\s*%}(?<body>[\s\S]*?){%\s*end\k<block>\s*%}|{%\s*render\s+(?<quote>['"])(?<template>\w+)\k<quote>(?<args>[\s\S]*?)%}|{{(?<output>[\s\S]*?)}}|(?<unsupported>{%[\s\S]*?%})/g;
    return markup.replace(tokens, (...match) => {
      const token = match.at(-1);
      if (token.unsupported) throw Error(`Unsupported Liquid syntax: ${token.unsupported}`);
      if (token.block === 'template') { templates.set(token.name, token.body); return ''; }
      if (token.block === 'capture') { scope[token.name] = fragment(token.body, scope, depth + 1); return ''; }
      if (token.block === 'unless') {
        const condition = value(token.name, scope, true);
        return condition === false || condition == null ? fragment(token.body, scope, depth + 1) : '';
      }
      if (token.template) {
        if (!templates.has(token.template)) throw Error(`Missing Liquid template: ${token.template}`);
        const parameters = {};
        const remainder = token.args.replace(/,\s*(\w+)\s*:\s*('[^']*'|"[^"]*"|[\w.]+)\s*/g, (_, key, expression) => {
          parameters[key] = value(expression, scope); return '';
        });
        if (remainder.trim()) throw Error(`Unsupported Liquid render arguments: ${token.args}`);
        return fragment(templates.get(token.template), parameters, depth + 1);
      }
      if (token.output !== undefined) {
        const expression = token.output.trim().match(/^([\w.]+)(?:\s*\|\s*(escape|base64_encode))?$/);
        if (!expression) throw Error(`Unsupported Liquid output: ${token.output}`);
        const result = value(expression[1], scope);
        if (expression[2] === 'base64_encode') return Buffer.from(String(result ?? '')).toString('base64');
        return expression[2] ? escape(result) : String(result ?? '');
      }
      return ''; // Liquid comment.
    });
  }
  return fragment(source, { ...variables });
}

module.exports = { renderLiquid };
