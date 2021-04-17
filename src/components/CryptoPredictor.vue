<template>
  <div>
    <v-card>
        <v-form v-model="valid">
            <v-container>
            <!-- <v-row>
                <CoinSearch/>
            </v-row> -->
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
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
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
    props: {
        coinName: String,
        coinId: String,
    },
    data () {
        return {
            valid: true,
            // menu: false,
            currentDateRange: '',
            startDateMenu: '',
            endDateMenu: '',
            whatIfStartDate: '',
            whatIfEndDate: new Date().toISOString().substr(0, 10),
            potentialProfit: '',
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

        async getWhatIfData() {
            console.log('ENTER getWhatIfData with date: ' + this.whatIfStartDate);
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
    
                priceAtDate = res.data.market_data.currentPrice.usd;
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
        saveStartDate (date) {
            this.$refs.startDateMenu.save(date)
        },
        saveEndDate (date) {
            this.$refs.endDateMenu.save(date)
        },
    },

}
</script>
