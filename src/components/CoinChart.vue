<template>
    <!-- <div>
        {{ prices }}
    </div> -->
    <div>
        <div class="amcharts-range-selector-period-wrapper">
                <button @click="createChart('oneM')">1M</button>
                <button @click="createChart('threeM')">3M</button>
                <button @click="createChart('sixM')">6M</button>
                <button @click="createChart('ytd')">YTD</button>
                <button>MAX</button>
        </div>
        <div class="coinChart" ref="chartdiv">
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
export default {
    data() {
        return {
            coinId: '',
            toDateRange: '',
            fromDateRange: '',
            prices: [],
            marketCaps: [],
            totalVolumes: [],
            firstLoad: false,
            currentDateRange: '',
        }
    },
    async created() {
        
        // this.firstLoad = true
        // // this.setDateRangesUnix(this.firstLoad);
        // let myDate = new Date()
        // this.toDateRange = Math.round(myDate.getTime() / 1000)
        // this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 1)/ 1000);


        // // TODO: add to coin component
        // this.coinId = this.$route.params.coinId;

        // this.createChart(this.fromDateRange, this.toDateRange);


    }, // created
    async mounted() {
        
        // TODO: add to coin component
        this.coinId = this.$route.params.coinId;

        // this.createChart(this.fromDateRange, this.toDateRange);
        this.createChart('firstLoad');
        

    }, // mounted
    async beforeUnmount() {

        if (this.chart) {

            this.chart.dispose();
        }
    },
    methods: {
        async createChart(dateRange) {

            if (this.currentDateRange !== dateRange) {

                this.setDateRangesUnix(dateRange)

                const baseURL = `https://api.coingecko.com/api/v3/coins/${ this.coinId }/market_chart/range?vs_currency=usd&`
                var apiParams = `from=${ this.fromDateRange }&to=${ this.toDateRange }`

                var fullURL = baseURL + apiParams
                // console.log(fullURL)

                try {
                    const res = await axios.get(fullURL)

                    this.prices = res.data.prices;
                    this.marketCaps = res.data.market_caps;
                    this.totalVolumes = res.data.total_volumes;
                    // console.log(this.prices)
                    // console.log(this.marketCaps)
                    // console.log(this.totalVolumes)

                } catch (e) {
  
                    console.log(e.response.status);
                }

                this.formatChart();
            }
        },
        formatChart() {

            // Clear the chart if it exists before creating anthoer one!
            if (this.chart) {
                // console.log('Disposing chart.....');
                this.chart.dispose();
            }
            
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

            chart.paddingRight = 20;

            let data = [];

            for (let i = 1; i < this.prices.length; i++) {
                // console.log('ENTER loop')
                data.push({ 
                    // first el in prices is date, second is price!
                    date: this.prices[i][0], 
                    // name: "name" + i, 
                    value: this.prices[i][1]
                });
            }

            chart.data = data;

            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            // dateAxis.tooltipDateFormat = "yyyy-MM-dd";

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;

            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";

            series.tooltipText = "Date: {dateX.formatDate('MMM, dd yyyy')}\nPrice: ${valueY.formatNumber('#,###.00')}";

            chart.cursor = new am4charts.XYCursor();

            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;

            this.chart = chart;
        },
        setDateRangesUnix(dateRange) {

            var myDate = new Date()

            // if it's the first load we will just set the chart to look a month back
            // we can adjust this later if 1 month back is unpopular
            if (dateRange === 'firstLoad') {
                // console.log('Is first load!')
                
                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 1)/ 1000);

            } else if (dateRange === 'oneM') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 1)/ 1000);

            } else if (dateRange === 'threeM') {
                                
                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 3)/ 1000);

            } else if (dateRange === 'sixM') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 6)/ 1000);

            } else if (dateRange === 'ytd') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 12)/ 1000);

            } 
            // else if (dateRange === 'max') {

            //     this.toDateRange = Math.round(myDate.getTime() / 1000)
            //     this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 1)/ 1000);
            // } 
            else {
                alert('Date Range Error! Please try again.')
            }
            
            // return this.currentDate
        },
        formatPrice(value) {
            // Create our number formatter.
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            });

            return formatter.format(value)
        },
    }
}
</script>

<style scoped>
.coinDescriptionLogo {
    width: 150px;
    height: 150px;
}

.coinChart {
  width: 100%;
  height: 500px;
  background: lightgray;
}

</style>