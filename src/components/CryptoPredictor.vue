<template>
  <div>
    <v-card>
        <v-form v-model="valid">
            <v-container>    
            <v-row v-if="coinId === null">
                <CoinSearch/>
            </v-row>
            <v-row>
                <v-card-title>{{ coinName }} What-If</v-card-title>
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
                    min="2013-01-01"
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
                        :min="minDate"
                        @change="saveEndDate"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                cols="12"
                md="4"
                >
                    <v-text-field
                        ref="amountInvested"
                        v-model="amountInvested"
                        label="Amount Invested"
                        value="1000.00"
                        prepend-icon="mdi-currency-usd"
                    ></v-text-field>
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
        <v-row v-if="potentialProfit !== ''">
            <v-card-subtitle 
                class="black--text
                text-xl-body-1 text-lg-body-1 text-md-body-1 text-sm-body-2 text-xs-body-2"
            >
                Potential Profit of {{ potentialProfit }}
            </v-card-subtitle>
        </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import CoinSearch from '@/components/CoinSearch.vue'


export default {
    mixins: [ validationMixin ],
    validations: {
      whatIfStartDate: { required },
      whatIfEndDate: { required },
    //   select: { required },
    },
    components: {
        CoinSearch,
    },
    props: {
        coinName: String,
        coinId: String,
    },
    data () {
        return {
            valid: true,
            // menu: false,
            minDate: '2013-01-01',
            amountInvested: '',
            currentDateRange: '',
            startDateMenu: '',
            endDateMenu: '',
            whatIfStartDate: '',
            whatIfEndDate: new Date().toISOString().substr(0, 10),
            potentialProfit: '',
            priceAtStart: '',
            priceAtEnd: '',
            potentialProfit: ''
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

        // async getWhatIfData() {
        //     console.log('ENTER getWhatIfData with date: ' + this.whatIfStartDate);
        //     this.potentialProfit = 999999.55

        //     var startDatePrice = this.getPriceAtDate(this.whatIfStartDate)

        //     console.log(startDatePrice)
        //     // var endDatePrice = getPriceAtDate(this.whatIfEndDate)
        // },
        async getWhatIfData() {

            var formattedStartDate = this.convertDateToUnix(this.whatIfStartDate)
            var formattedEndDate = this.convertDateToUnix(this.whatIfEndDate)

            const baseURL = `https://api.coingecko.com/api/v3/coins/`
            // 
            var apiParams = `${this.coinId}/market_chart/range?vs_currency=usd&from=${formattedStartDate}&to=${formattedEndDate}`

            try {
                console.log(baseURL + apiParams)
                const res = await axios.get(baseURL + apiParams)
    
                var pricesArr = res.data.prices
                // console.log(pricesArr)
                this.priceAtStart = pricesArr[0][1]
                // console.log(this.priceAtStart)
                this.priceAtEnd = pricesArr[pricesArr.length - 1][1]
                // console.log(this.priceAtStart)

                var tempStartingAmount = this.amountInvested / this.priceAtStart

                var totalEarnings = tempStartingAmount * this.priceAtEnd

                this.potentialProfit = this.formatPrice(totalEarnings)
                console.log(this.potentialProfit)

            } catch (e) {
                // if(e.response.status === 404) {
                //     console.log('ahhhhhhhhhhh')
                //     this.$router.push('/NotFound')
                // }
                // console.log(e.response.status);
                console.log(e);
            }

        },
        convertDateToUnix(dateToConvert){

            console.log(dateToConvert)

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