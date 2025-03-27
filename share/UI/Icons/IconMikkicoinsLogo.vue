<script setup lang="ts"></script>

<template>
  <svg viewBox="0 0 1920 700" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask
      id="mask0_352_13"
      style="mask-type: alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="1920"
      height="700"
    >
      <rect width="1920" height="700" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_352_13)">
      <g filter="url(#filter0_f_352_13)">
        <ellipse
          cx="960"
          cy="49.5"
          rx="960"
          ry="528.5"
          fill="url(#paint0_linear_352_13)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_f_352_13"
        x="-250"
        y="-729"
        width="2420"
        height="1557"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="125"
          result="effect1_foregroundBlur_352_13"
        />
      </filter>
      <linearGradient
        id="paint0_linear_352_13"
        x1="960"
        y1="-479"
        x2="960"
        y2="578"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F64C35" />
        <stop offset="1" stop-color="#F69235" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

@media (max-width: $md3 + px) {
  svg {
    display: none;
  }
}
</style>
