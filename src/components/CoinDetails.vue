<template>
    <div>
        <v-row>
            <v-breadcrumbs
                :items="breadCrumbItems"
                customDivider
                divider="/"
            ></v-breadcrumbs>
        </v-row>
        <div v-if="loading">
            <v-skeleton-loader
                type="list-item-avatar-three-line, image, article"
            ></v-skeleton-loader>
        </div>
        <v-row
            v-else
            no-gutters
        >
            <v-col
                cols="6"
            >
                <v-card
                    elevation="0"
                    color="rgb(255, 0, 0, 0)"
                    class="font-weight-bold"
                >
                    <v-card-title
                        v-if="coinDetails.name"
                    >
                        <v-avatar left size="50">
                            <img
                                :src="coinImage" 
                                :alt="coinDetails.name"
                            >
                        </v-avatar>
                        <span 
                            class="ml-2 
                            text-xl-h4 text-lg-h4 text-md-h4 text-sm-h4 text-xs-h4 
                            font-weight-bold"
                        >
                            {{ coinDetails.name }}  ({{ coinSymbol }})
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-chip
                            v-if="marketCapRank"
                            class="mb-2 font-weight-bold"
                            color="primary"
                        >
                            <span>
                                Rank
                            </span>
                            <v-avatar
                                right
                                class="secondary black--text"
                            >
                                {{ marketCapRank }}
                            </v-avatar>
                        </v-chip>
                        <br />
                        <v-chip
                            v-if="coinHomepage"
                            class="mb-2 font-weight-bold"
                            @click="linkToNewTab(coinHomepage)"
                            color="primary"
                        >
                            Website
                            <v-icon right>
                                mdi-link-variant
                            </v-icon>
                        </v-chip>
                        <br />
                        <v-chip
                            v-if="sourceCode"
                            class="mb-2 
                            text-subtitle-2
                            font-weight-bold"
                            @click="linkToNewTab(sourceCode)"
                            color="primary"
                        >
                            Source Code
                            <v-icon 
                                right
                            >
                                mdi-code-braces
                            </v-icon>
                        </v-chip>
                    </v-card-text>

                </v-card>
            </v-col>
            <v-spacer v-if="!$vuetify.breakpoint.mobile"></v-spacer>
            <!-- <v-spacer></v-spacer> -->
            <v-col
                cols="6"
            >
                <v-card
                    elevation="0"
                    color="rgb(255, 0, 0, 0)"
                >
                    <v-card-text 
                        class="text-right"
                    >
                        <span
                            class="black--text text-xl-h4 text-lg-h4 text-md-h4 text-sm-h4 text-h6 font-weight-bold"
                        >
                            {{ currentPrice }}
                        </span>
                        <span class= "text-xl-h5 text-lg-h5 text-md-h5 text-sm-h6 text-subtitle-1 font-weight-bold" :class="priceChangePercentage24h >= 0 ? 'success--text' : 'error--text'">
                            {{ formatPercentGain(priceChangePercentage24h) }}
                        </span>
                        <br />
                        <br />
                        
                        <span class="font-weight-bold">
                            Market Cap
                        </span>
                        <p
                            class="black--text 
                            text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-body-1 text-xs-body-2
                            font-weight-medium"
                        >
                            {{ formatMarketCap(marketCap) }}
                        </p>
                        <span class="font-weight-bold">
                            Total Supply
                        </span>
                        <p 
                            v-if="totalSupply"
                            class="black--text subtitle-1 font-weight-medium"
                        >
                            {{ totalSupply }}
                        </p>
                        <p 
                            v-else
                            class="black--text subtitle-1 font-weight-medium"
                        >
                            --
                        </p>
                        <span class="font-weight-bold">
                            Max Supply
                        </span>
                        <p 
                            v-if="maxSupply"
                            class="black--text subtitle-1 font-weight-medium"
                        >
                            {{ maxSupply }}
                        </p>
                        <p v-else
                            class="black--text subtitle-1 font-weight-medium"
                        >
                            --
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div
            align="center"
        >
            <v-row
                v-if="coinDescription"
                class="pa-3"
                style="max-width: 900px"
            >
                <v-expansion-panels accordion>
                    <v-expansion-panel class="mb-12">
                        <v-expansion-panel-header class="font-weight-bold">
                            {{ coinDetails.name }} Overview
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <p class="text-justify" v-html="coinDescription"></p>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-row>
        </div>
        <v-divider></v-divider>
        <div v-if="$vuetify.breakpoint.xsOnly">
            <template>
                <div class="text-left">
                    <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        >
                            <v-icon
                            left
                            light
                            >
                                mdi-calendar
                            </v-icon>
                            Date Range
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                        v-for="(theRange, index) in chartRanges"
                        :key="index"
                        >
                        <v-list-item-title @click="createChart(theRange.id)">{{ theRange.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-menu>
                </div>
            </template>
        </div>
        <div v-else>
            <v-btn-toggle
                mandatory
                color="primary"
            >
                <v-btn
                    v-for="theRange in chartRanges"
                    :key="theRange.id"
                    @click="createChart(theRange.id)"
                >{{ theRange.text }}</v-btn>
            </v-btn-toggle>
        </div>
        <div v-if="chartLoading">
            <v-progress-linear 
                indeterminate
                value="15"
                color="#2A9D8F"
            ></v-progress-linear>
        </div>
        <div class="coinChart" ref="chartdiv"></div>
        <CryptoPredictor 
            v-if="detailsPageMetaInfo"
            :coinName="coinDetails.name" 
            :coinId="coinId" 
            :coinImage="coinImage" 
            :detailsPageMetaInfo="detailsPageMetaInfo"/>
    </div>
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
    metaInfo() {
        return {
            title: this.detailsPageMetaInfo.title,
            description: this.detailsPageMetaInfo.description,
            meta: [
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: this.detailsPageMetaInfo.url },
                { property: 'og:title', content: this.detailsPageMetaInfo.title },
                { property: 'og:description', content: this.detailsPageMetaInfo.description },
                { property: 'og:image', content: this.detailsPageMetaInfo.image },

                { property: 'twitter:card', content: 'summary_large_image'} ,
                { property: 'twitter:url', content: this.detailsPageMetaInfo.url },
                { property: 'twitter:title', content: this.detailsPageMetaInfo.title },
                { property: 'twitter:description', content: this.detailsPageMetaInfo.description },
                { property: 'twitter:image', content: this.detailsPageMetaInfo.image },
            ]
        }
    },
    data() {
        return {
            detailsPageMetaInfo: null,
            chartNumberSampling: 0.0,
            loading: false,
            currency: 'usd',
            coinId: '',
            coinName: '',
            coinDetails: {},
            coinImage: '',
            coinDescription: '',
            coinSymbol: '',
            coinGenesisDate: '',
            currentPrice: '',
            marketCapRank: '',
            marketCap: '',
            totalSupply: '',
            maxSupply: '',
            priceChangePercentage24h: '',
            coinHomepage: '',
            sourceCode: '',
            toDateRange: '',
            fromDateRange: '',
            currDateSelection: '',
            // indicator: '',
            // indicatorInterval: '',
            hourglass: '',
            prices: [],
            marketCaps: [],
            totalVolumes: [],
            firstLoad: false,
            // prevRoute: null,
            chartLoading: false,
            chartNumberFormatString: '',
            chartRanges: [
                { id: '24H', text: '24HR' },
                { id: 'sevenD', text: '1W' },
                { id: 'oneM', text: '1M' },
                { id: 'threeM', text: '3M' },
                { id: 'sixM', text: '6M' },
                { id: 'ytd', text: 'YTD' },
                { id: 'max', text: 'MAX' },
            ],
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

        this.detailsPageMetaInfo = {
            title: this.coinName,
            description: `${this.coinName} prices, historical data, and more!`,
            image: this.coinImage,
            url: `${this.$router.currentRoute.path}`,
        }   
        // console.log(this.detailsPageMetaInfo)

        this.loading = true

        const baseURL = `https://api.coingecko.com/api/v3/coins/`
        var apiParams = `?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

        try {
            const res = await axios.get(baseURL + this.coinId + apiParams)

            this.coinDetails = res.data;
            this.coinName = this.coinDetails.name
            this.coinImage = this.coinDetails.image.large
            this.coinDescription = this.coinDetails.description.en
            this.coinGenesisDate = this.coinDetails.genesis_date
            this.coinSymbol = this.coinDetails.symbol.toUpperCase()
            this.loading = false
            this.currentPrice = this.formatPrice(this.coinDetails.market_data.current_price.usd)
            this.marketCapRank = this.coinDetails.market_cap_rank
            this.marketCap = this.coinDetails.market_data.market_cap.usd
            this.totalSupply = this.numberWithCommas(this.coinDetails.market_data.total_supply)
            this.maxSupply = this.numberWithCommas(this.coinDetails.market_data.max_supply)
            this.coinHomepage = this.coinDetails.links.homepage[0]
            this.priceChangePercentage24h = this.coinDetails.market_data.price_change_percentage_24h
            this.sourceCode = this.coinDetails.links.repos_url.github[0]
            // console.log(this.coinDetails.market_data.current_price.usd)

            // this.createChart(this.fromDateRange, this.toDateRange);
            this.createChart('firstLoad');

            this.loading = false

        } catch (e) {
            if(e.response.status === 404) {
                // console.log('ahhhhhhhhhhh')
                this.$router.push('/NotFound')
            }
            console.log(e.response.status);

            this.loading = false
        }
        this.loading = false
    },
    async mounted() {
        
        // TODO: add to coin component
        // this.coinId = this.$route.params.coinId;

        // this.createChart(this.fromDateRange, this.toDateRange);
        // this.createChart('firstLoad');
        
    }, // mounted
    beforeUnmount() {

        if (this.chart) {

            this.chart.dispose();
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // vm.prevRoute = from
            vm.breadCrumbItems[0].href = from
            // console.log(from)
        })
    },
    beforeRouteLeave() {
        this.chart.dispose()
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

            this.chartLoading = true;

            if (this.currentDateRange !== dateRange) {

                const baseURL = `https://api.coingecko.com/api/v3/coins/${ this.coinId }/market_chart/`

                var apiParams = ''

                if (dateRange == 'max') {

                    apiParams = `?vs_currency=usd&days=max&interval=monthly`
                    // console.log(this.coinGenesisDate)
                    // this.fromDateRange = new Date(this.coinGenesisDate).getTime() / 1000
                    // this.fromDateRange = this.coinGenesisDate;

                } else {

                    this.setDateRangesUnix(dateRange)
                    apiParams = `range?vs_currency=usd&from=${ this.fromDateRange }&to=${ this.toDateRange }`
                }

                var fullURL = baseURL + apiParams
                // console.log(fullURL)

                try {
                    const res = await axios.get(fullURL)

                    this.prices = res.data.prices;
                    this.marketCaps = res.data.market_caps;
                    this.totalVolumes = res.data.total_volumes;
                    this.fromDateRange = res.data.prices[0][0]
                    // console.log('The from date: ' + this.formatUnixDate(this.fromDateRange))
                    // console.log(this.marketCaps)
                    // console.log(this.totalVolumes)

                } catch (e) {
                    console.log('ERROR')
                    console.log(e.response);
                    this.chartLoading = false;
                }

                this.formatChart();
                this.chartLoading = false;
            }
        },
        formatChart() {

            // Clear the chart if it exists before creating another one!
            if (this.chart) {
                // console.log('Disposing chart.....');
                this.chart.dispose();
            }
            
            let chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
            chart = this.showChartIndicator(chart);

            chart.numberFormatter.smallNumberThreshold = 0.000000000001
            chart.tapToActivate = true;

            chart.preloader.disabled = true;
        
            // chart.paddingRight = 20;

            let data = [];

            this.chartNumberSampling = this.prices[0][1]
            this.setTooltipPrice(this.chartNumberSampling)
            // console.log('Sampling: ' + this.chartNumberSampling)

            for (let i = 1; i < this.prices.length; i++) {
                
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

                let state = ''
                
                if (target instanceof am4charts.Chart) {
                    state = target.states.create(stateId);
                    state.properties.paddingTop = 0;
                    state.properties.paddingRight = 15;
                    state.properties.paddingBottom = 5;
                    state.properties.paddingLeft = 15;
                    return state;
                }
                
                if (target instanceof am4core.Scrollbar) {
                    state = target.states.create(stateId);
                    state.properties.marginBottom = -10;
                    return state;
                }
                               
                return null;
            }
            });

            let title = chart.titles.create();
            title.text = this.coinDetails.name;
            title.fontSize = 30;

            let topContainer = chart.chartContainer.createChild(am4core.Container);
            topContainer.layout = "absolute";
            topContainer.toBack();
            topContainer.paddingBottom = 0;
            topContainer.width = am4core.percent(100);

            let dateTitle = topContainer.createChild(am4core.Label);
            // console.log(this.fromDateRange)
            // console.log(this.toDateRange)
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
            dateAxis.tooltip.disabled = true;
            // Disables the vertical lines...
            dateAxis.renderer.grid.template.disabled = true;
                        
            // dateAxis.tooltipDateFormat = "yyyy-MM-dd";

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.renderer.minWidth = 5;

            // valueAxis.adjustLabelPrecision = false;

            valueAxis.numberFormatter = new am4core.NumberFormatter();
            valueAxis.numberFormatter.numberFormat = this.chartNumberFormatString;

            let series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.dateX = "date";
            series.dataFields.valueY = "value";

            let tooltipPriceFormatString = this.chartNumberFormatString;

            series.tooltipText = "[bold]{dateX.formatDate('MMM, dd yyyy')}[/]\n[bold]Price:[/] {valueY.formatNumber('" + tooltipPriceFormatString + "')}"
            
            series.tooltip.autoTextColor = false;
            series.tooltip.label.fill = am4core.color("#000");

            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color("#E9C46A");

            series.strokeWidth = 3;
            series.stroke = am4core.color("#2A9D8F");


            chart.cursor = new am4charts.XYCursor();

            let scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(series);
            chart.scrollbarX = scrollbarX;

            this.chart = chart;
            // this.hideIndicator();
        },
        setTooltipPrice(samplingPrice) {

            if (samplingPrice < 1 & samplingPrice >= .001) {
                
                this.chartNumberFormatString = '$#,###.00000'
            } else if (samplingPrice < .001 & samplingPrice >= .0001) {

                this.chartNumberFormatString = '$#,###.000000'
            } else if (samplingPrice < .0001 & samplingPrice >= .00001) {

                this.chartNumberFormatString = '$#,###.0000000'
            } else if (samplingPrice < .00001 & samplingPrice >= .000001) {

                this.chartNumberFormatString = '$#,###.00000000'
            } else if (samplingPrice < .000001 & samplingPrice >= .0000001) {

                this.chartNumberFormatString = '$#,###.000000000'
            } else if (samplingPrice < .0000001 & samplingPrice >= .00000001) {

                this.chartNumberFormatString = '$#,###.0000000000'
            } else {

                this.chartNumberFormatString = '$#,###.00'
            }

            return this.chartNumberFormatString
        },
        showChartIndicator(theChart) {

            let indicator = ''
            let indicatorInterval = ''
            let hourglass = ''

            theChart.events.on("ready", function(ev){
                
                indicator.hide();
            });
        
            if (!indicator) {
                indicator = theChart.tooltipContainer.createChild(am4core.Container);
                indicator.background.fill = am4core.color("#fff");
                indicator.background.fillOpacity = 0.6;
                indicator.width = am4core.percent(100);
                indicator.height = am4core.percent(100);

                let indicatorLabel = indicator.createChild(am4core.Label);
                if (this.coinDetails.name) {
                    indicatorLabel.text = `Finalizing ${this.coinDetails.name} Chart...`;    
                } else {
                    indicatorLabel.text = `Finalizing Chart...`; 
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
                // this.fromDateRange = Math.round((myDate.getDate() - 1)/ 1000);
                this.fromDateRange = Math.round(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) / 1000)
                this.currDateSelection = '24H'

            } else if (dateRange === '24H') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                // this.fromDateRange = Math.round((myDate.getDate() - 1)/ 1000);
                this.fromDateRange = Math.round(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) / 1000)
                this.currDateSelection = '24H'

            } else if (dateRange === 'sevenD') {

                this.toDateRange = Math.round(myDate.getTime() / 1000)
                this.fromDateRange = Math.round(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) / 1000)
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
            let formatOptions = {
                style: 'currency',
                currency: 'USD',
                // These options are needed to round to whole numbers if that's what you want.
                //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
                //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
            }

            if (value < 0.01) {
                formatOptions.minimumSignificantDigits = 2
                formatOptions.maximumSignificantDigits = 2
            }

            // Create our number formatter
            var formatter = new Intl.NumberFormat('en-US', formatOptions);

            return formatter.format(value)
        },
        formatMarketCap(value) {
            // Create our number formatter.
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: this.currency,
                minimumFractionDigits: 0
            });

            return formatter.format(value)
        },
        numberWithCommas(x) {
            return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
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
            var unixtimestamp = theUnixDate.toString().substring(0, 10);;

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
        linkToNewTab(theLink) {
            window.open(theLink, "_blank")
        }
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