<script setup lang="ts">
import ChangeB2BInfoForm from '~/features/ProfileForms/InfoForms/ChangeB2BInfoForm/ChangeB2BInfoForm.vue'
import ChangeEmailForm from '~/features/ProfileForms/InfoForms/ChangeEmailForm/ChangeEmailForm.vue'
import ChangeInvoiceForm from '~/features/ProfileForms/InfoForms/ChangeInvoiceForm/ChangeInvoiceForm.vue'
import ChangePasswordForm from '~/features/ProfileForms/InfoForms/ChangePasswordForm/ChangePasswordForm.vue'
import B2BSummary from '~/share/components/cabinet/B2BSummary/B2BSummary.vue'
import CabinetChangeCard from '~/share/components/cabinet/CabinetChangeCard/CabinetChangeCard.vue'
import SummaryInfo from '~/share/components/cabinet/SummaryInfo/SummaryInfo.vue'
import { useUserStore } from '~/share/store/userStore'

const userStore = useUserStore()
</script>
<template>
  <section class="info">
    <div class="info-account">
      <h3>Вход в учетную запись</h3>
      <CabinetChangeCard
        title="Пароль"
        value="**************"
        warning="Пожалуйста, помните, что новый пароль должен содержать минимум 8
        символов и включать одну прописную, одну строчную букву и одну цифру."
        :component="ChangePasswordForm"
      />
      <CabinetChangeCard
        title="Электронная почта"
        :value="userStore.user?.email"
        warning="Если Вы хотите изменить адрес электронной почты, связанный с Вашей учетной записью, заполните следующие поля"
        :component="ChangeEmailForm"
      />
    </div>
    <div class="info-private">
      <h3>
        {{ !userStore.user?.userB2B ? 'Личные данные' : '' }}
      </h3>
      <CabinetChangeCard
        :title="
          userStore.user?.userB2B ? 'Данные компании' : 'Данные счета фактуры'
        "
        :is-big-title="!!userStore.user?.userB2B"
        :component="
          userStore.user?.userB2B ? ChangeB2BInfoForm : ChangeInvoiceForm
        "
        v-bind="
          userStore.user?.userB2B
            ? { initialData: userStore.user.userB2B }
            : { initialData: userStore.user }
        "
      />
    </div>
    <div class="summary-info">
      <SummaryInfo v-if="!userStore.user?.userB2B" />
      <B2BSummary v-else />
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
  flex: 0 0 554px;

  &-account,
  &-private {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}

@media (max-width: $md2 + 'px') {
  .info {
    max-width: 554px;
    flex: 1;
  }
}

@media (max-width: $md3 + 'px') {
  .info {
    gap: 24px;
  }
}
</style>
