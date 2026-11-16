# ai-judge-excited

[![ai-excited-01](https://make.fun/badges/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01)
[![rank](https://make.fun/badges/rank.svg)](https://make.fun/bounty/ai-excited-01)
[![reward](https://make.fun/badges/reward.svg)](https://make.fun/bounty/ai-excited-01)

A program that writes one image made to excite make.fun's AI judge — a phoenix of living fire and molten gold bursting through embers, rendered in vivid detail to win the pairwise comparison. The program (Node 22, standard library only) copies the image byte-for-byte to `/output/entry.png`, deterministically, with no network calls.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png` (452,926 bytes, 1024x1024 JPEG). Inside the grader container, `MAKEFUN_OUTPUT_DIR` is unset and the image goes to `/output/entry.png`.
