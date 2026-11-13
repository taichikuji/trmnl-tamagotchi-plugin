/* Trace the ROM's animation controller using tamarecomp's generated CPU.
 * Build once per ROM with TAMA_TRACING; no firmware bytes are included here.
 * FRAME records resolved upper/lower tile descriptors; LOOP records the repeat.
 */
#include <setjmp.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "tamarecomp/e0c6200.h"

static jmp_buf returned;
static unsigned short rom[6144];
static unsigned upper = 127, lower = 127;

void tama_trace_hook(const tama_t *t, unsigned short pc) {
    if (pc == 0x300) longjmp(returned, 1);
    if (pc == 0x928 || pc == 0x939) {
        unsigned page = pc == 0x928 ? 0xc00 : 0xd00;
        unsigned address = page + (rom[page + t->mem[0x5d]] & 255) + t->a;
        if (address >= 6144) { fputs("bad sprite address\n", stderr); exit(1); }
        unsigned value = (rom[address] & 255) ^ ((t->b & 8) ? 128 : 0);
        if (pc == 0x928) upper = value; else lower = value;
    }
}

static void call(tama_t *t, unsigned pc) {
    /* Return into our hook instead of booting the surrounding device firmware. */
    t->sp = 0xe0;
    t->mem[0xe0] = 0; t->mem[0xe1] = 0; t->mem[0xe2] = 3;
    t->pc = pc;
    if (!setjmp(returned)) {
        tama_run(t, t->cycles + 100000);
        fprintf(stderr, "no return %x\n", pc);
        exit(1);
    }
}

int main(int argc, char **argv) {
    if (argc != 2) return 2;
    FILE *f = fopen(argv[1], "rb");
    if (!f) return 2;
    uint32_t fingerprint = 2166136261u;
    for (unsigned i = 0; i < 6144; i++) {
        int a = fgetc(f), b = fgetc(f);
        if (a < 0 || b < 0) return 2;
        rom[i] = (a << 8) | b;
        fingerprint = (fingerprint ^ a) * 16777619u;
        fingerprint = (fingerprint ^ b) * 16777619u;
    }
    fclose(f);
    printf("ROM %u\n", fingerprint);
    for (unsigned c = 0; c < 12; c++) for (unsigned action = 0; action < 11; action++) {
        tama_t t = {0};
        t.mem[0x5d] = c; t.mem[0x5e] = action; t.mem[0x7c] = 15;
        upper = lower = 127;
        call(&t, 0x465);
        /* Controller RAM plus the retained tiles define the repeated state. */
        unsigned char seen[512][20];
        unsigned count = 0;
        for (unsigned tick = 0; tick < 512; tick++) {
            unsigned char key[20];
            memcpy(key, t.mem + 0x5f, 18);
            key[18] = upper; key[19] = lower;
            unsigned i;
            for (i = 0; i < count; i++) if (!memcmp(key, seen[i], 20)) break;
            if (i < count) {
                printf("LOOP %u %u %u %u\n", c, action, tick, i);
                break;
            }
            memcpy(seen[count++], key, 20);
            call(&t, 0x486);
            printf("FRAME %u %u %u %u %u\n", c, action, tick, upper, lower);
            if (tick == 511) { fputs("animation did not loop\n", stderr); return 1; }
        }
    }
    return 0;
}
