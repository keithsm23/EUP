import React from 'react'

const AboutUs = React.lazy(() => import('./components/AboutUs'))
const Services = React.lazy(() => import('./components/Services'))
const News = React.lazy(() => import('./components/News'))
const Contact = React.lazy(() => import('./components/Contact'))
const Page=React.lazy(() => import('./components/Page'))

const routes = [
    { path: '/', exact: true, name: 'home' },
    { path: '/about', name: 'About Us', element: AboutUs },
    { path: '/services', name: 'Services', element: Services },
    { path: '/news', name: 'News', element: News },
    { path: '/contact', name: 'Contact', element: Contact },
    { path: '/page', name: 'Page', element: Page }
  ]

export default routes