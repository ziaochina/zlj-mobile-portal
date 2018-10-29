
import { actionMixin, fetch, getComponent, navigate } from 'maka'

@actionMixin('base')
export default class action {
    constructor(option) {
        Object.assign(this, option.mixins)
    }

    onInit = ({ component, injections }) => {
        this.load()
        navigate.listen(this.listen)
        navigate.redirect(navigate.getLocation().pathname + navigate.getLocation().search)
    }

    load = async () => {
        const response = await fetch.post('/v1/portal/init', {})
        if (response.user) {
            this.base.context.set('currentUser', response.user)
        }
        else {
            this.base.context.set('currentUser', undefined)
        }
    }

    tabChange = (key) => {
        this.base.setState({ 'data.selectedTab': key })
    }

    tabIsSelected = (data, key) => {
        return data.selectedTab == key
    }

    setContent = (title, appName, appProps) => {
        if (!appName)
            return

        var data = this.base.getState('data'),
            menu = data.menu,
            openTabs = data.openTabs || [],
            isTabsStyle = data.isTabsStyle,
            oriMenuItem = this.findMenu(menu, appName),
            json = {}

        const currContent = data.content
        if (currContent && appName == currContent.appName)
            return

        title = title || (oriMenuItem && oriMenuItem.title)
        appProps = appProps || (oriMenuItem && oriMenuItem.appProps) || {}

        var content = { title, appName, appProps }
        json['data.content'] = content

        var hitIndex = openTabs.findIndex(o => o.title == title || o.appName == appName)
        var hit = hitIndex != -1

        if (!hit) {
            if (!isTabsStyle)
                openTabs = []
            openTabs.push(content)

            json['data.openTabs'] = openTabs
        }
        else {
            if (isTabsStyle) {
                json['data.openTabs' + hitIndex] = content
            }
            else {
                openTabs = []
                openTabs.push(content)
                json['data.openTabs'] = openTabs
            }
        }

        this.base.setState(json)

        setTimeout(() => {
            let location = navigate.getLocation()
            let full = `${location.pathname}${location.search}`
            let segs = full.split('/')
            segs = segs.slice(0, segs.indexOf('zlj-portal') + 1)
            segs.push(content.appName)
            navigate.redirect(segs.join('/'))
        }, 0)
    }


    listen = (location, action) => {
        let full = `${location.pathname}${location.search}`
        if (!full || full.indexOf('zlj-portal') == -1)
            return

        let segs = full.split('/'),
            targetApp = segs[segs.length - 1]

        if (targetApp == 'zlj-portal' || !targetApp) {
            this.base.ss({
                'data.openTabs': [],
                'data.content': {}
            })
        }
        else {
            this.setContent('', targetApp)
        }
    }

    componentWillUnmount = () => {
        navigate.unlisten(this.listen)
    }
}

