<template>
  <div>
    <v-card
        class="mx-auto mt-8 pa-3"
        max-width="1000"
    >
        <v-form 
            v-model="valid"
            ref="form"
        >
            <v-container>  
            <v-row
                justify="center"
            >
                <v-col class="shrink">
                        <v-img src="../../src/assets/professor_hindsight.png" max-width="300" class="ml-3"></v-img>
                </v-col>
            </v-row>
            <v-row
                justify="center"
            >
                <v-card-title 
                    class="pa-0
                        font-weight-bold
                        text-xl-h4 text-lg-h4 text-md-h4 text-sm-h4 h5"
                >
                    Professor Hindsight
                </v-card-title>
            </v-row>
            <v-row
                class="pl-2"
                align="center"
            >
                <v-avatar 
                    v-if="coinImage"
                    left 
                    size="35"
                >
                    <img :src="coinImage" >
                </v-avatar>
                <span
                    v-if="coinName"
                    class="pl-2 font-weight-medium text-xl-h6 text-lg-h6 text-md-h6 text-sm-h6 h5"
                >
                    {{ coinName }}
                </span>
            </v-row>
            <v-row
                v-if="!coinName"
            >
                <v-col
                    cols="10"
                    md="8"
                >
                    <v-autocomplete
                        v-model="myCoinId"
                        :items="allCoins"
                        clearable
                        item-text="name"
                        item-value="id"
                        no-data-text="No coins to display"
                        prepend-icon="mdi-bitcoin"
                        auto-select-first
                        dense
                        label="Select Coin"
                        :rules="coinIdRules"
                    >
                        <template 
                            v-slot:item="data"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    #{{ data.item.market_cap_rank }} &nbsp; {{ data.item.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle v-text="data.item.symbol"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-avatar>
                                <v-img 
                                    :src="data.item.thumb"
                                    max-height="22"
                                    max-width="22"
                                >
                                </v-img>
                            </v-list-item-avatar>
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="10"
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
                        :rules="startDateRules"
                    ></v-text-field>
                    </template>
                    <v-date-picker
                        ref="startDatePicker"
                        v-model="whatIfStartDate"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="2013-01-01"
                        @change="saveStartDate"
                    ></v-date-picker>
                </v-menu>
                </v-col>
                <v-col
                    cols="10"
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
                            :rules="endDateRules"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        ref="endDatePicker"
                        v-model="whatIfEndDate"
                        :max="new Date().toISOString().substr(0, 10)"
                        :min="minDate"
                        @change="saveEndDate"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-text-field
                        ref="amountInvested"
                        v-model="amountInvested"
                        label="Amount Invested"
                        :rules="investedRules"
                        pattern="\d*"
                        prepend-icon="mdi-currency-usd"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn
                color="secondary"
                class="text-left black--text
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-body-2"
                dark
                @click="validate"
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
        <v-row v-if="hindsightErrorMessage">
            <v-card-subtitle 
                class="red--text font-weight-bold
                text-xl-subtitle-2 text-lg-subtitle-2 text-md-subtitle-2 text-sm-body-1 text-xs-body-1"
            >
                {{ hindsightErrorMessage }}
            </v-card-subtitle>
        </v-row>
        <div 
            class="text-center"
            v-if="loadingCalculation"
        >
            <v-progress-circular
            indeterminate
            color="primary"
            >
            </v-progress-circular>
        </div>
        <div v-if="newAmount !== ''">
            <v-card-title>
                <v-row align="start">
                    <div class="text-caption grey--text text-uppercase">
                        Total Profit
                    </div>
                    <div>
                    <span 
                        class="font-weight-bold" 
                        :class="(newAmount - amountInvested) >= 0 ? 'success--text' : 'error--text'">
                        {{ this.totalProfit }}
                    </span>
                    </div>
                </v-row>
            </v-card-title>
            <v-sparkline
                :value="sparklineValue"
                :smooth="sparklineRadius || false"
                :padding="sparklinePadding"
                :line-width="sparklineWidth"
                :stroke-linecap="sparklineLineCap"
                :gradient="sparklineGradient"
                :gradient-direction="sparklineGradientDirection"
                :type="sparklineType"
                :auto-line-width="sparklineAutoLineWidth"
                auto-draw
            ></v-sparkline>
            <v-card-subtitle 
                class="black--text font-weight-bold
                text-xl-h6 text-lg-h6 text-md-h6 text-sm-subtitle-1 text-xs-subtitle-1"
            >
                Investment Details
            </v-card-subtitle>
            <v-row>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p class="mb-0 font-weight-bold">
                            Starting Price
                        </p> 
                            {{ this.formatPrice(priceAtStart) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-card-subtitle 
                        class="black--text 
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p class="mb-0 font-weight-bold">
                            Ending Price
                        </p>
                        {{ this.formatPrice(priceAtEnd) }}
                    </v-card-subtitle>
                </v-col>
                <v-col
                    cols="10"
                    md="4"
                >
                    <v-card-subtitle 
                        class="black--text
                        text-xl-subtitle-1 text-lg-subtitle-1 text-md-subtitle-1 text-sm-subtitle-2 text-xs-subtitle-2"
                    >
                        <p class="mb-0 font-weight-bold">
                            New Amount
                        </p>
                        {{ this.formatPrice(newAmount) }}
                    </v-card-subtitle>
                </v-col>
            </v-row>
        </div>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

// import CoinSearch from '@/components/CoinSearch.vue'


export default {
    mixins: [ validationMixin ],
    validations: {
      whatIfStartDate: { required },
      whatIfEndDate: { required },
      myCoinId: { required },
    },
    components: {},
    props: {
        coinName: String,
        coinId: String,
        coinImage: String,
        // coinStartDate: Datex
    },
    data () {
        return {
            //////////////////////////////////
            // Sparkline properties
            //////////////////////////////////
            sparklineWidth: 2,
            sparklineRadius: 10,
            sparklinePadding: 8,
            sparklineLineCap: 'round',
            // sparklineValue: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
            sparklineValue: [],
            sparklineFill: false,
            sparklineType: 'trend',
            sparklineAutoLineWidth: false,
            sparklineGradient: ['#f72047', '#ffd200', '#1feaea'],
            sparklineGradientDirection: 'top',
            //////////////////////////////////
            //////////////////////////////////
            valid: true,
            // menu: false,
            minDate: '2013-01-01',
            amountInvested: '',
            currentDateRange: '',
            startDateMenu: '',
            endDateMenu: '',
            whatIfStartDate: '',
            whatIfEndDate: new Date().toISOString().substr(0, 10),
            newAmount: '',
            priceAtStart: '',
            priceAtEnd: '',
            allCoins: [],
            myCoinId: '',
            totalProfit: '',
            listLoading: 'primary',
            hindsightErrorMessage: '',
            loadingCalculation: false,
            startDateRules: [
                v => !!v || 'Start Date is Required',
            ],
            endDateRules: [
                v => !!v || 'End Date is Required',
            ],
            investedRules: [
                v => !!v || 'Amount Invested is Required',
            ],
            coinIdRules: [
                v => !!v || 'Coin Selection is Required',
            ],
        }
    },
    mounted() {
        this.allCoins = this.$session.get('allCoins')

        if(this.coinId) {
            this.myCoinId = this.coinId
        }
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

        async validate () {
            // console.log('Validating....')
            if (this.$refs.form.validate()) {
                this.getWhatIfData() 
            }
        },
        async getWhatIfData() {

            this.loadingCalculation = true
            // Reset error message and profit amounts!
            this.hindsightErrorMessage = ''
            this.newAmount = ''

            var formattedStartDate = this.convertDateToUnix(this.whatIfStartDate)
            var formattedEndDate = this.convertDateToUnix(this.whatIfEndDate)

            const baseURL = `https://api.coingecko.com/api/v3/coins/`
            // 
            var apiParams = `${this.myCoinId}/market_chart/range?vs_currency=usd&from=${formattedStartDate}&to=${formattedEndDate}`

            try {
                // console.log(baseURL + apiParams)
                const res = await axios.get(baseURL + apiParams)
    
                var pricesArr = res.data.prices
                this.sparklineValue = pricesArr.map(function(value, index) { return value[1]; });
                // console.log(pricesArr)
                this.priceAtStart = pricesArr[0][1]
                // console.log(this.priceAtStart)
                this.priceAtEnd = pricesArr[pricesArr.length - 1][1]
                // console.log(this.priceAtStart)

                var tempStartingAmount = this.amountInvested / this.priceAtStart

                var totalEarnings = tempStartingAmount * this.priceAtEnd

                this.newAmount = totalEarnings

                this.totalProfit = this.formatPrice(this.newAmount - this.amountInvested)
                // console.log(this.newAmount)

            } catch (e) {

                this.hindsightErrorMessage = 'Calculation Error, please try again!'

                // if(e.response.status === 404) {
                //     console.log('ahhhhhhhhhhh')
                //     this.$router.push('/NotFound')
                // }
                // console.log(e.response.status);
                console.log(e);
            }

            this.loadingCalculation = false

        },
        convertDateToUnix(dateToConvert){

            // console.log(dateToConvert)
            return new Date(dateToConvert).getTime() / 1000
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
        // async getPriceAtDate(theDate){

        //     const baseURL = `https://api.coingecko.com/api/v3/coins/`

        //     var formattedDateString = this.formatDateForApi(theDate);

        //     var apiParams = `${this.coinId}/history?date=${formattedDateString}`

        //     var priceAtDate = ''

        //     try {
        //         console.log(baseURL + apiParams)
        //         const res = await axios.get(baseURL + apiParams)
    
        //         priceAtDate = res.data.market_data.currentPrice.usd;
        //         console.log(priceAtDate)
        //         // this.coinImage = this.coinDetails.image.large

        //         // console.log(priceAtDate)

        //     } catch (e) {
        //         if(e.response.status === 404) {
        //             console.log('ahhhhhhhhhhh')
        //             this.$router.push('/NotFound')
        //         }
        //         console.log(e.response.status);
        //     }

        //     return priceAtDate
        // },
        saveStartDate (date) {
            this.$refs.startDateMenu.save(date)
        },
        saveEndDate (date) {
            this.$refs.endDateMenu.save(date)
        },
    },
}
</script>