export default {
    singular: true,
    plugins: [
      ['umi-plugin-react', {
        antd: true
      }]
    ],
    routes: [
        {
            path: '/',
            component: '../layout',
            routes: [
                {
                    path: '/',
                    component: 'Home'
                },
                {
                    path: '/home',
                    component: 'Home'
                },
                {
                    path: '/tab',
                    component: 'Tab'
                },
                {
                    path: '/dashboard',
                    routes: [
                        {path: '/dashboard/analysis', component: 'Dashboard/Analysis'},
                        {path: '/dashboard/monitor', component: 'Dashboard/Monitor'},
                        {path: '/dashboard/workplace', component: 'Dashboard/Workplace'}
                    ]
                }
            ]
        }
    ]
}
