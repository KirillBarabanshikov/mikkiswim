<script setup lang="ts">
import { useManager } from '~/entities/user-b2b/api/query'

const { data: managerInfo, isPending } = useManager()
</script>

<template>
  <client-only>
    <div class="manager-block">
      <div class="manager-block__inner">
        <div class="manager-block__body">
          <div class="manager-block__title">Ваш менеджер</div>
          <div class="manager-block__name">
            {{ managerInfo?.name + ' ' + managerInfo?.surname }}
          </div>
          <div class="manager-block__phone">
            {{ managerInfo?.phone ?? 'Телефон не указан' }}
          </div>
          <div class="manager-block__email">
            {{ managerInfo?.email ?? 'Почта не указан' }}
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.manager-block {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: end;
    line-height: 155%;
    font-weight: 400;
  }

  &__title {
    font-weight: 700;
    font-size: 20px;
  }

  &__name {
    font-size: 16px;
  }

  &__phone,
  &__email {
    font-size: 12px;
  }
}

@media (max-width: $md2 + 'px') {
  .manager-block {
    &__body {
      align-items: start;
    }
  }
}
</style>
