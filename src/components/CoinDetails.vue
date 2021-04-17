<template>
    <div>
        <v-breadcrumbs
            :items="breadCrumbItems"
            customDivider
            divider="/"
        ></v-breadcrumbs>
        <v-card
            elevation="0"
            color="rgb(255, 0, 0, 0)"
        >
            <v-img 
                class="" 
                max-height="150"
                max-width="150"
                :src="coinImage" 
                :alt="coinDetails.name"
            >
            </v-img> 
            <v-card-title
                class="text-h2"
            >
                {{ coinDetails.name }} - {{ coinSymbol }}
            </v-card-title>

            <v-card-text
                v-html="coinDescription"
            >
            </v-card-text>

        </v-card>
        <v-divider></v-divider>
        <div 
            class="amcharts-range-selector-period-wrapper"
        >
            <v-btn @click="createChart('oneM')">1M</v-btn>
            <v-btn @click="createChart('threeM')">3M</v-btn>
            <v-btn @click="createChart('sixM')">6M</v-btn>
            <v-btn @click="createChart('ytd')">YTD</v-btn>
            <v-btn @click="createChart('max')">MAX</v-btn>
        </div>
            <div class="coinChart" ref="chartdiv">
        </div>
        <v-card>
            <v-form v-model="valid">
                <v-container>
                <!-- <v-row>
                    <CoinSearch/>
                </v-row> -->
                <v-row>
                    <v-card-title>{{ coinDetails.name }} What-If</v-card-title>
                </v-row>
                <v-row>
                    <v-col
                    cols="12"
                    md="4"
                    >
                    <v-menu
                        ref="startDateMenu"
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="whatIfStartDate"
                            label="Start Date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        ref="startDatePicker"
                        v-model="whatIfStartDate"
                        :max="new Date().toISOString().substr(0, 10)"
                        :min="coinGenesisDate"
                        @change="saveStartDate"
                        ></v-date-picker>
                    </v-menu>
                    </v-col>
                    <v-col
                    cols="12"
                    md="4"
                    >
                        <v-menu
                            ref="endDateMenu"
                            v-model="endDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="whatIfEndDate"
                                label="End Date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                            ref="endDatePicker"
                            v-model="whatIfEndDate"
                            :max="new Date().toISOString().substr(0, 10)"
                            :min="coinGenesisDate"
                            @change="saveEndDate"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-btn
                    color="secondary"
                    class="text-left black--text
                    text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-body-2"
                    dark
                    @click="getWhatIfData"
                    >
                    <v-icon
                    left
                    light
                    >
                    mdi-calculator
                    </v-icon>
                        Calculate
                    </v-btn>
                </v-container>
            </v-form>
            <v-row>
                <v-card-subtitle>{{ potentialProfit }}</v-card-subtitle>
            </v-row>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

import CoinSearch from '@/components/CoinSearch.vue'

am4core.useTheme(am4themes_animated);

export default {
    name: 'CoinDetails',
    mixins: [validationMixin],
    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },
    components: {
        CoinSearch,
    },
    data() {
        return {
            valid: true,
            // menu: false,
            coinId: '',
            coinDetails: {},
            coinImage: '',
            coinDescription: '',
            coinSymbol: '',
            coinGenesisDate: '',
            toDateRange: '',
            fromDateRange: '',
            prices: [],
            marketCaps: [],
            totalVolumes: [],
            firstLoad: false,
            currentDateRange: '',
            startDateMenu: '',
            endDateMenu: '',
            whatIfStartDate: '',
            whatIfEndDate: new Date().toISOString().substr(0, 10),
            potentialProfit: '',
            // prevRoute: null,
            breadCrumbItems: [
                {
                    text: 'Coin List',
                    disabled: false,
                    href: '/crypto',
                },
                {
                    text: this.$route.params.coinId,
                    disabled: true,
                    href: '',
                },
            ],
        }
    },
    async created() {

        this.coinId = this.$route.params.coinId;

        const baseURL = `https://api.coingecko.com/api/v3/coins/`
        var apiParams = `?tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`

        try {
            const res = await axios.get(baseURL + this.coinId + apiParams)
 
            this.coinDetails = res.data;
            this.coinImage = this.coinDetails.image.large
            this.coinDescription = this.coinDetails.description.en
            this.coinGenesisDate = this.coinDetails.genesis_date
            this.whatIfStartDate = this.coinGenesisDate
            this.coinSymbol = this.coinDetails.symbol.toUpperCase()
            console.log(this.coinGenesisDate)

        } catch (e) {
            if(e.response.status === 404) {
                console.log('ahhhhhhhhhhh')
                this.$router.push('/NotFound')
            }
            console.log(e.response.status);
        }
    },
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
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // vm.prevRoute = from
            vm.breadCrumbItems[0].href = from
            console.log(from)
        })
    },
    watch: {
        // These functions make sure the date picker opens on year first
        startDateMenu (val) {
        val && setTimeout(() => (this.$refs.startDatePicker.activePicker = 'YEAR'))
        },
        endDateMenu (val) {
            val && setTimeout(() => (this.$refs.endDatePicker.activePicker = 'YEAR'))
        },
    },
    methods: {

        async getWhatIfData() {
            console.log('ENTER getWhatIfData');
            this.potentialProfit = 999999.55

            var startDatePrice = this.getPriceAtDate(this.whatIfStartDate)

            console.log(startDatePrice)

            // var endDatePrice = getPriceAtDate(this.whatIfEndDate)
        },
        async getPriceAtDate(theDate){

            const baseURL = `https://api.coingecko.com/api/v3/coins/`

            var formattedDateString = this.formatDateForApi(theDate);

            var apiParams = `${this.coinId}/history?date=${formattedDateString}`

            var priceAtDate = ''

            try {
                console.log(baseURL + apiParams)
                const res = await axios.get(baseURL + apiParams)
    
                priceAtDate = res.data;
                console.log(priceAtDate)
                // this.coinImage = this.coinDetails.image.large

                // console.log(priceAtDate)

            } catch (e) {
                if(e.response.status === 404) {
                    console.log('ahhhhhhhhhhh')
                    this.$router.push('/NotFound')
                }
                console.log(e.response.status);
            }

            return priceAtDate
        },
        async createChart(dateRange) {

            if (this.currentDateRange !== dateRange) {

                const baseURL = `https://api.coingecko.com/api/v3/coins/${ this.coinId }/market_chart/`

                if (dateRange == 'max') {

                    var apiParams = `?vs_currency=usd&days=max&interval=monthly`
                    console.log(this.coinGenesisDate)
                    this.fromDateRange = new Date(this.coinGenesisDate).getTime() / 1000
                    // this.fromDateRange = this.coinGenesisDate;

                } else {

                    this.setDateRangesUnix(dateRange)
                    var apiParams = `range?vs_currency=usd&from=${ this.fromDateRange }&to=${ this.toDateRange }`
                }

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
        formatDateForApi(theDate) {
            var theDateAsDate = new Date(
                theDate.substring(0,4),
                theDate.substring(5,7)-1,
                theDate.substring(8,10)
            )
            // console.log('Formatting Date: ' + theDateAsDate)

            return ("0" + theDateAsDate.getDate()).slice(-2) + "-" + 
                ("0"+(theDateAsDate.getMonth()+1)).slice(-2) + "-" +
                theDateAsDate.getFullYear();
            // console.log(formattedDateString)
        },
        formatChart() {

            // Clear the chart if it exists before creating another one!
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

            chart.responsive.enabled = true;

            chart.responsive.enabled = true;
            chart.responsive.useDefault = false

            chart.responsive.rules.push({
            relevant: function(target) {
                if (target.pixelWidth <= 400) {
                return true;
                }
                
                return false;
            },
            state: function(target, stateId) {
                
                if (target instanceof am4charts.Chart) {
                    var state = target.states.create(stateId);
                    state.properties.paddingTop = 0;
                    state.properties.paddingRight = 15;
                    state.properties.paddingBottom = 5;
                    state.properties.paddingLeft = 15;
                    return state;
                }
                
                if (target instanceof am4core.Scrollbar) {
                    var state = target.states.create(stateId);
                    state.properties.marginBottom = -10;
                    return state;
                }
                               
                return null;
            }
            });

            let title = chart.titles.create();
            title.text = this.coinDetails.name;
            title.fontSize = 25;

            let topContainer = chart.chartContainer.createChild(am4core.Container);
            topContainer.layout = "absolute";
            topContainer.toBack();
            topContainer.paddingBottom = 0;
            topContainer.width = am4core.percent(100);

            let dateTitle = topContainer.createChild(am4core.Label);
            dateTitle.text = this.formatUnixDate(this.fromDateRange) + " to " + this.formatUnixDate(this.toDateRange);
            dateTitle.fontWeight = 600;
            dateTitle.align = "right";

            let watermark = new am4core.Image();
            watermark.href = this.coinImage;
            chart.plotContainer.children.push(watermark);
            watermark.align = "right";
            watermark.valign = "bottom";
            watermark.opacity = 0.4;
            watermark.marginRight = 10;
            watermark.marginBottom = 5;

            let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;
            // dateAxis.tooltipDateFormat = "yyyy-MM-dd";

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 35;

            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";

            series.tooltipText = "[bold]{dateX.formatDate('MMM, dd yyyy')}[/]\n[bold]Price:[/] ${valueY.formatNumber('#,###.00')}";
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#2A9D8F");

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
        formatUnixDate(theUnixDate) {
            // Unixtimestamp
            var unixtimestamp = theUnixDate;

            // Months array
            var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            // Convert timestamp to milliseconds
            var date = new Date(unixtimestamp*1000);

            // Year
            var year = date.getFullYear();

            // Month
            var month = months_arr[date.getMonth()];

            // Day
            var day = date.getDate();
            // Display date time in MM-dd-yyyy h:m:s format
            var convdataTime = month+'-'+day+'-'+year;
            
            return convdataTime; 
        },
        saveStartDate (date) {
            this.$refs.startDateMenu.save(date)
        },
        saveEndDate (date) {
            this.$refs.endDateMenu.save(date)
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