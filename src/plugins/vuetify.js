import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#264653',
            secondary: '#E9C46A',
            success: '#2A9D8F',
            accent: '#2A9D8F',
            error: '#E76F51',
          },
        },
    },
});
