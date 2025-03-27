<script setup lang="ts">
defineProps<{ price: number | null }>()
</script>

<template>
  <div class="success-activation-block">
    <div class="amount" v-if="price">+{{ price }}</div>
    <p>
      Mikki сертификат <br />
      Активирован
    </p>
  </div>
</template>

<style scoped lang="scss">
.success-activation-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  line-height: 155%;
  font-size: 14px;
  color: var(--green);
  text-align: end;

  .amount {
    font-weight: 700;
  }

  p {
    font-weight: 400;
  }
}
</style>
