<template>
    <v-container>
        <v-row>
            <v-breadcrumbs
                :items="breadCrumbItems"
                customDivider
                divider="/"
            ></v-breadcrumbs>
        </v-row>
        <v-row>
            <v-col
                cols="4"
            >
                <v-card
                    elevation="0"
                    color="rgb(255, 0, 0, 0)"
                >
                    <v-card-title 
                        class=""
                    >
                        <v-avatar size="56">
                        <img
                            :src="coinImage" 
                            :alt="coinDetails.name"
                        >
                        </v-avatar>
                        <span 
                            class="ml-3 text-h4 font-weight-bold"
                        >
                            {{ coinDetails.name }}  ({{ coinSymbol }})
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <span>
                            {{ marketCapRank }}
                        </span>
                        <br />
                        <span>
                            <a :href="coinHomepage"> Website</a>
                        </span>
                        <br />
                        <span>
                            <a :href="sourceCode"> Source Code</a>
                        </span>
                    </v-card-text>

                </v-card>
            </v-col>
            <v-spacer></v-spacer>
            <v-col
                cols="4"
            >
                <v-card
                    elevation="0"
                    color="rgb(255, 0, 0, 0)"
                >
                    <v-card-text 
                        class="text-right"
                    >
                        <p
                            class="black--text text-h4 font-weight-bold"
                        >
                            {{ currentPrice }}
                            <span :class="priceChangePercentage24h >= 0 ? 'success--text' : 'error--text'">
                                {{ formatPercentGain(priceChangePercentage24h) }}
                            </span>
                        </p>
                        
                        Market Cap
                        <p
                            class="black--text subtitle-1 font-weight-medium"
                        >
                            {{ marketCap }}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-card class="mb-12">
                <v-card-title>{{ coinDetails.name }} Overview</v-card-title>
                <v-card-text
                    v-html="coinDescription"
                >
                </v-card-text>
            </v-card>
        </v-row>
        <v-divider></v-divider>
        <!-- <div 
            class="amcharts-range-selector-period-wrapper"
        > -->
            <v-btn-toggle
        
        mandatory
        color="primary accent-1"
        
      >
        <v-btn value="left">
          Left
        </v-btn>

        <v-btn value="center">
          Center
        </v-btn>

        <v-btn value="right">
          Right
        </v-btn>

        <v-btn value="justify">
          Justify
        </v-btn>
      </v-btn-toggle>
            <v-btn tile outlined elevation="2" color="primary" @click="createChart('24H')">24Hr</v-btn>
            <v-btn tile elevation="2" color="primary" @click="createChart('sevenD')">1W</v-btn>
            <v-btn tile outlined elevation="2" color="primary" @click="createChart('oneM')">1M</v-btn>
            <v-btn tile outlined elevation="2" color="primary" @click="createChart('threeM')">3M</v-btn>
            <v-btn tile outlined elevation="2" color="primary" @click="createChart('sixM')">6M</v-btn>
            <v-btn tile outlined elevation="2" color="primary" @click="createChart('ytd')">YTD</v-btn>
            <v-btn tile outlined elevation="2" color="primary"@click="createChart('max')">MAX</v-btn>
        <!-- </div> -->
            <div class="coinChart" ref="chartdiv">
        </div>
        <CryptoPredictor :coinName="coinDetails.name" :coinId="coinId"/>
    </v-container>
</template>

<script>
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import CryptoPredictor from '@/components/CryptoPredictor.vue'

am4core.useTheme(am4themes_animated);

export default {
    name: 'CoinDetails',
    components: {
        CryptoPredictor,
    },
    data() {
        return {
            coinId: '',
            coinDetails: {},
            coinImage: '',
            coinDescription: '',
            coinSymbol: '',
            coinGenesisDate: '',
            currentPrice: '',
            marketCapRank: '',
            marketCap: '',
            priceChangePercentage24h: '',
            coinHomepage: '',
            sourceCode: '',
            toDateRange: '',
            fromDateRange: '',
            currDateSelection: '',
            indicator: '',
            indicatorInterval: '',
            hourglass: '',
            prices: [],
            marketCaps: [],
            totalVolumes: [],
            firstLoad: false,
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
        var apiParams = `?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

        try {
            const res = await axios.get(baseURL + this.coinId + apiParams)
 
            this.coinDetails = res.data;
            this.coinImage = this.coinDetails.image.large
            this.coinDescription = this.coinDetails.description.en
            this.coinGenesisDate = this.coinDetails.genesis_date
            this.coinSymbol = this.coinDetails.symbol.toUpperCase()
            this.currentPrice = this.formatPrice(this.coinDetails.market_data.current_price.usd)
            this.marketCapRank = 'Market Cap #' + this.coinDetails.market_cap_rank
            this.marketCap = this.formatPrice(this.coinDetails.market_data.market_cap.usd)
            this.coinHomepage = this.coinDetails.links.homepage[0]
            this.priceChangePercentage24h = this.coinDetails.market_data.price_change_percentage_24h
            this.sourceCode = this.coinDetails.links.repos_url.github[0]
            // console.log(this.coinDetails.market_data.current_price.usd)

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
                    console.log('ERROR')
                    console.log(e.response);
                }

                this.formatChart();
            }
        },
        formatChart() {

            // Clear the chart if it exists before creating another one!
            if (this.chart) {
                // console.log('Disposing chart.....');
                this.chart.dispose();
            }
            
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);

            chart.preloader.disabled = true;
        
            chart = this.showChartIndicator(chart);
            // chart.paddingRight = 20;

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

            // this.hideIndicator();
        },
        showChartIndicator(theChart) {

            let indicator = ''
            let indicatorInterval = ''
            let hourglass = ''

            theChart.events.on("ready", function(ev){
                indicator.hide();
                clearInterval(this.indicatorInterval);
            });
        
            if (!indicator) {
                indicator = theChart.tooltipContainer.createChild(am4core.Container);
                indicator.background.fill = am4core.color("#fff");
                indicator.background.fillOpacity = 0.6;
                indicator.width = am4core.percent(100);
                indicator.height = am4core.percent(100);

                let indicatorLabel = indicator.createChild(am4core.Label);
                if (this.coinDetails.name) {
                    indicatorLabel.text = `Loading ${this.coinDetails.name} History...`;    
                } else {
                    indicatorLabel.text = `Loading History...`; 
                }
                
                indicatorLabel.align = "center";
                indicatorLabel.valign = "middle";
                indicatorLabel.fontSize = 20;
                indicatorLabel.dy = 50;
                
                hourglass = indicator.createChild(am4core.Image);
                hourglass.href = this.coinImage;
                hourglass.align = "center";
                hourglass.valign = "middle";
                hourglass.horizontalCenter = "middle";
                hourglass.verticalCenter = "middle";
                hourglass.scale = 0.7;
            }

            indicator.hide(0);
            indicator.show();
            
            clearInterval(indicatorInterval);
            indicatorInterval = setInterval(function() {
                hourglass.animate([{
                    from: 0,
                    to: 360,
                    property: "rotation"
                }], 1000);
            }, 2000);

            return theChart;
        },
        // hideIndicator() {
        //     this.indicator.hide();
        //     clearInterval(this.indicatorInterval);
        // },
        async formatDateForApi(theDate) {
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
        setDateRangesUnix(dateRange) {

            var myDate = new Date()

            // if it's the first load we will just set the chart to look a month back
            // we can adjust this later if 1 month back is unpopular
            if (dateRange === 'firstLoad') {
                // console.log('Is first load!')
                
                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 1)/ 1000);

            } else if (dateRange === '24H') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round((myDate.getDate() - 1)/ 1000);
                this.currDateSelection = '24H'

            } else if (dateRange === 'sevenD') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round((myDate.getDate() - 7)/ 1000);
                this.currDateSelection = 'sevenD'

            }  else if (dateRange === 'oneM') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 1)/ 1000);
                this.currDateSelection = 'oneM'

            } else if (dateRange === 'threeM') {
                                
                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 3)/ 1000);
                this.currDateSelection = 'threeM'

            } else if (dateRange === 'sixM') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 6)/ 1000);
                this.currDateSelection = 'sixM'

            } else if (dateRange === 'ytd') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(myDate.setMonth(myDate.getMonth() - 12)/ 1000);
                this.currDateSelection = 'ytd'
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
        formatPercentGain(value) {

            let formattedNum = parseFloat(value).toFixed(2);

            if(isNaN(formattedNum)) {
            return this.formatPrice(0.0).replace('$', '')+'%'
            } else {
            return this.formatPrice(formattedNum).replace('$', '')+'%'
            }
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
    }
}
</script>

<style scoped>


.coinChart {
  width: 100%;
  height: 500px;
  background: lightgray;
}
</style>