<script setup lang="ts">
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger
} from 'radix-vue'
import { useField } from 'vee-validate'
import { ref } from 'vue'

import IconArrowRight from '~/share/UI/Icons/IconArrowRight.vue'
import IconCalendar from '~/share/UI/Icons/IconCalendar.vue'

const props = defineProps<{
  name: string
  placeholder?: string
  validator?: any
}>()

const { value, errorMessage, handleChange } = useField(
  props.name,
  props.validator
)
const modelValue = ref(value.value)

const onDateSelect = (date: string) => {
  handleChange(date)
}
</script>

<template>
  <div class="datepicker">
    <DatePickerRoot
      v-model="modelValue"
      id="date-field"
      granularity="day"
      locale="ru"
      :modal="true"
      @update:model-value="onDateSelect"
    >
      <DatePickerField v-slot="{ segments }" class="datepicker-field">
        <template v-for="item in segments" :key="item.part">
          <DatePickerInput
            v-if="item.part === 'literal'"
            :part="item.part"
            class="datepicker-literal"
          >
            {{ item.value }}
          </DatePickerInput>
          <DatePickerInput v-else :part="item.part" class="datepicker-segment">
            {{ item.value }}
          </DatePickerInput>
        </template>

        <DatePickerTrigger class="datepicker-trigger">
          <IconCalendar />
        </DatePickerTrigger>
      </DatePickerField>

      <DatePickerContent
        align="center"
        side="right"
        :side-offset="16"
        class="popover-content"
      >
        <DatePickerArrow class="popover-arrow" />
        <DatePickerCalendar v-slot="{ weekDays, grid }" class="calendar">
          <DatePickerHeader class="calendar-header">
            <DatePickerPrev class="calendar-nav-button">
              <IconArrowLeft />
            </DatePickerPrev>

            <DatePickerHeading class="calendar-heading" />
            <DatePickerNext class="calendar-nav-button">
              <IconArrowRight />
            </DatePickerNext>
          </DatePickerHeader>
          <div class="calendar-wrapper">
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="calendar-grid"
            >
              <DatePickerGridHead>
                <DatePickerGridRow
                  class="calendar-grid-row calendar-grid-row-days"
                >
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="calendar-head-cell"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="calendar-grid-row calendar-grid-row-nums"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="calendar-cell"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="calendar-cell-trigger"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
    <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>
  </div>
</template>

<style lang="scss">
@use 'DatePicker';
.error-msg {
  font-size: 14px;
  color: var(--red);
  margin: 8px 0 0 4px;
}
</style>
