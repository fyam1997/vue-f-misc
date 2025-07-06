import {createApp} from 'vue'
import Demo from './Demo.vue'
// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'

// Icons
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import {aliases, md} from 'vuetify/iconsets/md'


const vuetify = createVuetify(
    {
        components: {
            ...components,
            ...labsComponents,
        },
        directives: directives,
        icons: {
            defaultSet: 'md',
            aliases,
            sets: {
                md,
            },
        },
        theme: {
            defaultTheme: 'dark',
        },
    }
)


createApp(Demo)
    .use(vuetify)
    .mount('#app')
