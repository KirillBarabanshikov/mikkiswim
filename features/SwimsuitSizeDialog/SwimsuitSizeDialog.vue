<script setup lang="ts">
import Dialog from '~/share/UI/Dialog/Dialog.vue'
import IconClose from '~/share/UI/Icons/IconClose.vue'
import IconLogo from '~/share/UI/Icons/IconLogo.vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Dialog :is-open="true" @close="emit('close')" :has-close="false">
    <div class="size">
      <div class="size-close" @click="emit('close')">
        <IconClose />
      </div>
      <div class="size-header">Swimsuit</div>
      <div class="size-content">
        <div class="size-img">
          <img src="/img/product_page/size_swimsuit.webp" alt="" />
        </div>
        <div class="size-table">
          <div class="size-row header-row">
            <div class="size-ceil">Размер</div>
            <div class="size-ceil green"></div>
            <div class="size-ceil yellow"></div>
            <div class="size-ceil red"></div>
            <div class="size-ceil blue"></div>
            <div class="size-ceil">
              Размер<br />
              (RUS)
            </div>
          </div>
          <div class="size-row">
            <div class="size-ceil">3 XS</div>
            <div class="size-ceil">55</div>
            <div class="size-ceil">38</div>
            <div class="size-ceil">55</div>
            <div class="size-ceil">44</div>
            <div class="size-ceil">36</div>
          </div>
          <div class="size-row">
            <div class="size-ceil">2 XS</div>
            <div class="size-ceil">66</div>
            <div class="size-ceil">45</div>
            <div class="size-ceil">66</div>
            <div class="size-ceil">52</div>
            <div class="size-ceil">38</div>
          </div>
          <div class="size-row">
            <div class="size-ceil">XS</div>
            <div class="size-ceil">76</div>
            <div class="size-ceil">55</div>
            <div class="size-ceil">76</div>
            <div class="size-ceil">64</div>
            <div class="size-ceil">40</div>
          </div>
          <div class="size-row">
            <div class="size-ceil">S</div>
            <div class="size-ceil">86</div>
            <div class="size-ceil">62</div>
            <div class="size-ceil">86</div>
            <div class="size-ceil">72</div>
            <div class="size-ceil">42</div>
          </div>
          <div class="size-row">
            <div class="size-ceil">M</div>
            <div class="size-ceil">91</div>
            <div class="size-ceil">68</div>
            <div class="size-ceil">91</div>
            <div class="size-ceil">76</div>
            <div class="size-ceil">44</div>
          </div>
          <div class="size-row">
            <div class="size-ceil">L</div>
            <div class="size-ceil">96</div>
            <div class="size-ceil">73</div>
            <div class="size-ceil">96</div>
            <div class="size-ceil">80</div>
            <div class="size-ceil">46</div>
          </div>
          <div class="size-row">
            <div class="size-ceil">XL</div>
            <div class="size-ceil">102</div>
            <div class="size-ceil">78</div>
            <div class="size-ceil">102</div>
            <div class="size-ceil">84</div>
            <div class="size-ceil">48</div>
          </div>
        </div>
      </div>
      <div class="size-footer">
        <IconLogo />
      </div>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.size {
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 48px;

  &-close {
    position: absolute;
    right: 24px;
    top: 24px;
    cursor: pointer;

    svg {
      width: 24px;
    }
  }

  &-header {
    text-align: center;
    font-size: 48px;
    font-weight: 700;
  }

  &-content {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  &-img {
    max-width: 150px;
  }

  &-table {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;

    .size-ceil {
      &:last-child,
      &:first-child {
        flex: 0 0 70px;
        text-align: left;
      }
    }

    &.header-row {
      font-weight: 700;
    }
  }

  &-ceil {
    flex: 0 0 30px;
    text-align: center;

    &.green {
      &:before {
        display: block;
        content: '';
        width: 30px;
        height: 30px;
        flex: 0 0 30px;
        border-radius: 50%;
        background-color: var(--green);
      }
    }

    &.yellow {
      &:before {
        display: block;
        content: '';
        width: 30px;
        height: 30px;
        flex: 0 0 30px;
        border-radius: 50%;
        background-color: var(--yellow);
      }
    }

    &.red {
      &:before {
        display: block;
        content: '';
        width: 30px;
        height: 30px;
        flex: 0 0 30px;
        border-radius: 50%;
        background-color: var(--red);
      }
    }

    &.blue {
      &:before {
        display: block;
        content: '';
        width: 30px;
        height: 30px;
        flex: 0 0 30px;
        border-radius: 50%;
        background-color: var(--blue);
      }
    }
  }

  &-footer {
    display: flex;
    justify-content: center;

    svg {
      width: 254px;
      color: var(--gray-400);
    }
  }
}
</style>
