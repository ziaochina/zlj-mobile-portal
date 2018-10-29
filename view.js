export default {
    component: 'div',
    className: 'zlj-mobile-portal',
    children: [{
        component: 'div',
        style: { height: '100%' },
        className: `{{(data.content && data.content.appName) ? 'zlj-mobile-portal-hidden': 'zlj-mobile-portal-show'}}`,
        children: {
            component: 'antdMobile.TabBar',
            children: [{
                component: 'antdMobile.TabBar.Item',
                key: 'home',
                title: 'Home',
                icon: {
                    component: 'div',
                    style: {
                        width: 22,
                        height: 22,
                        background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
                    }
                },
                selectedIcon: {
                    component: 'div',
                    style: {
                        width: 22,
                        height: 22,
                        background: 'url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg) center center /  21px 21px no-repeat'
                    }
                },
                selected: `{{$tabIsSelected(data, 'home')}}`,
                onPress: `{{()=>$tabChange('home')}}`,
                children: {
                    component: 'h2',
                    children: 'Home'
                }
            }, {
                component: 'antdMobile.TabBar.Item',
                key: 'list',
                title: 'List',
                icon: {
                    component: 'div',
                    style: {
                        width: 22,
                        height: 22,
                        background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
                    }
                },
                selectedIcon: {
                    component: 'div',
                    style: {
                        width: 22,
                        height: 22,
                        background: 'url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg) center center /  21px 21px no-repeat'
                    }
                },
                selected: `{{$tabIsSelected(data, 'list')}}`,
                onPress: `{{()=>$tabChange('list')}}`,
                children: {
                    component: 'h2',
                    children: 'List'
                }
            }, {
                component: 'antdMobile.TabBar.Item',
                key: 'my',
                title: 'My',
                icon: {
                    component: 'div',
                    style: {
                        width: 22,
                        height: 22,
                        background: 'url(https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg) center center /  21px 21px no-repeat'
                    }
                },
                selectedIcon: {
                    component: 'div',
                    style: {
                        width: 22,
                        height: 22,
                        background: 'url(https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg) center center /  21px 21px no-repeat'
                    }
                },
                selected: `{{$tabIsSelected(data, 'my')}}`,
                onPress: `{{()=>$tabChange('my')}}`,
                children: {
                    component: 'h2',
                    children: 'My'
                }
            }]
        }
    }, {
        component: 'div',
        style: { height: '100%' },
        className: `{{(data.content && data.content.appName) ? 'zlj-mobile-portal-openPages zlj-mobile-portal-show': 'zlj-mobile-portal-openPages zlj-mobile-portal-hidden'}}`,
        children: [{
            _for: 'page in data.openPages',
            component: 'AppLoader',
            appName: '{{ page && page.appName }}',
            '...': '{{ page && page.appProps }}'
        }]
    }]
}