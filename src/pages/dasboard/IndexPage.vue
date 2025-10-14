<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Line chart -->
      <div class="col-12 col-md-7">
        <q-card flat bordered class="q-pa-sm">
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">Monthly Sales</div>
            <div class="text-subtitle2 text-grey">Last 12 months</div>
          </q-card-section>
          <div ref="lineRef" class="chart" />
        </q-card>
      </div>

      <!-- Pie chart -->
      <div class="col-12 col-md-5">
        <q-card flat bordered class="q-pa-sm">
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">User Distribution</div>
            <div class="text-subtitle2 text-grey">By role</div>
          </q-card-section>
          <div ref="pieRef" class="chart-small" />
        </q-card>

        <!-- Bar chart -->
        <q-card flat bordered class="q-pa-sm q-mt-sm">
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">Top Categories</div>
            <div class="text-subtitle2 text-grey">This month</div>
          </q-card-section>
          <div ref="barRef" class="chart-medium" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// register ECharts components
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  PieChart,
  CanvasRenderer,
])

// refs
const lineRef = ref(null)
const barRef = ref(null)
const pieRef = ref(null)

// chart instances
let lineChart = null
let barChart = null
let pieChart = null

// sample data
const sampleLine = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  sales: [1200, 1400, 1500, 1300, 1700, 2000, 2200, 2100, 1900, 2300, 2400, 2600],
}
const sampleBar = {
  categories: ['Elektronik', 'Furniture', 'Pakaian', 'Makanan', 'Lainnya'],
  values: [540, 320, 460, 880, 210],
}
const samplePie = [
  { name: 'Admin', value: 8 },
  { name: 'Manager', value: 12 },
  { name: 'User', value: 80 },
]

// init charts
function initCharts() {
  if (lineRef.value) {
    lineChart = echarts.init(lineRef.value)
    lineChart.setOption(getLineOption(sampleLine))
  }
  if (barRef.value) {
    barChart = echarts.init(barRef.value)
    barChart.setOption(getBarOption(sampleBar))
  }
  if (pieRef.value) {
    pieChart = echarts.init(pieRef.value)
    pieChart.setOption(getPieOption(samplePie))
  }
  window.addEventListener('resize', handleResize)
}

// dispose charts
function disposeCharts() {
  window.removeEventListener('resize', handleResize)
  lineChart?.dispose()
  barChart?.dispose()
  pieChart?.dispose()
}

// handle resize
function handleResize() {
  lineChart?.resize()
  barChart?.resize()
  pieChart?.resize()
}

// chart option factories
function getLineOption(data) {
  return {
    tooltip: { trigger: 'axis' },
    toolbox: { feature: { saveAsImage: {} }, right: 10 },
    xAxis: { type: 'category', data: data.months, boundaryGap: false },
    yAxis: { type: 'value', axisLabel: { formatter: (v) => `${v}` } },
    grid: { left: 10, right: 10, bottom: 20, top: 30 },
    series: [
      {
        name: 'Sales',
        type: 'line',
        smooth: true,
        data: data.sales,
        areaStyle: { color: 'rgba(33,150,243,0.12)' },
        lineStyle: { width: 2 },
        itemStyle: { color: '#1976d2' },
      },
    ],
  }
}

function getBarOption(data) {
  return {
    tooltip: { trigger: 'axis' },
    toolbox: { feature: { saveAsImage: {} }, right: 10 },
    xAxis: { type: 'category', data: data.categories, axisLabel: { interval: 0, rotate: 0 } },
    yAxis: { type: 'value' },
    grid: { left: 10, right: 10, bottom: 30, top: 10 },
    series: [
      {
        name: 'Value',
        type: 'bar',
        data: data.values,
        itemStyle: { color: '#26a69a' },
        barMaxWidth: 40,
      },
    ],
  }
}

function getPieOption(data) {
  return {
    tooltip: { trigger: 'item' },
    legend: { orient: 'horizontal', left: 'center', top: 'bottom' },
    toolbox: { feature: { saveAsImage: {} }, right: 10 },
    series: [
      {
        name: 'Users',
        type: 'pie',
        radius: ['40%', '65%'],
        avoidLabelOverlap: false,
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' },
        },
        label: { show: true, position: 'outside', formatter: '{b}: {d}%' },
        data: data,
      },
    ],
  }
}

// lifecycle
onMounted(() => {
  initCharts()
  // uncomment jika mau fetch real API
  // loadDashboardFromApi()
})
onBeforeUnmount(() => disposeCharts())
</script>

<style scoped>
.chart {
  width: 100%;
  height: 360px;
  min-height: 300px;
}
.chart-small {
  width: 100%;
  height: 220px;
  min-height: 180px;
}
.chart-medium {
  width: 100%;
  height: 240px;
  min-height: 200px;
}
/* Card tweaks */
.q-card {
  background: var(--q-color-grey-1);
}
</style>
