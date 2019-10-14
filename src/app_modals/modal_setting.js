import React from "react";
import { AppFrameAction } from "./../appframe";
import { Tab ,Dropdown} from 'semantic-ui-react'
import user_avatar from './../img/man.png';
import {ContextConnector} from "../appcontext";
import {BIPSAppContext} from "../AppData";
import $ from "jquery";

const stateLanguages = [
    { key: '1', value: 'eng', text: 'English' },
    { key: '2', value: 'ina', text: 'Indonesian' },
];

const stateTimeZone = [
    { key: '1', value: 'gmt-12', text: '(GMT-12:00) International' },
    { key: '2', value: 'gmt-11', text: '(GMT-11:00) Midway Island' },
];



const panes = [
  { menuItem: 'Appearance', render: () => <Tab.Pane><TabAppearance/></Tab.Pane> },
  { menuItem: 'Privacy', render: () => <Tab.Pane><TabPrivacy/></Tab.Pane> },
  { menuItem: 'Notification', render: () => <Tab.Pane><TabNotification/></Tab.Pane> },
]
class ModalSetting extends React.Component {

  render() {
      const grey = 'gray';
    return (
      <>
        <div className="text-white f-12">
        <Tab
            menu={{grey, fluid: true, vertical: true }}
            menuPosition='left'
            panes={panes}
            grid={{paneWidth: 12, tabWidth: 3}}
        />
        </div>
      </>
    );
  }
}

class TabAppearance_Base extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        valueTheme: this.props.thememode === true ? "night" : "light",
        valueScale: this.props.scaleState,
        valueBalance : "0",
        scalemode: 1,
    }

    changeScale80 = () => {
        var zoomLevelL = 1.26;

        var zoomLevel = 0.8;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

        document.body.style.setProperty('--card-667', "855px");
        document.body.style.setProperty('--card-trading', "390px");
        document.body.style.setProperty('--card-213', "295px");
        document.body.style.setProperty('--card-249', "330px");
        document.body.style.setProperty('--card-75', "805px");
        document.body.style.setProperty('--card-515', "680px");
        document.body.style.setProperty('--card-295', "300px");
        document.body.style.setProperty('--card-292', "470px");
        document.body.style.setProperty('--card-600', "790px");
        document.body.style.setProperty('--card-199', "260px");
        document.body.style.setProperty('--card-225', "285px");
        document.body.style.setProperty('--card-170', "228px");
        document.body.style.setProperty('--card-550', "725px");
        document.body.style.setProperty('--card-grafik', "488px");
        document.body.style.setProperty('--card-530', "720px");
        document.body.style.setProperty('--card-500', "680px");
        document.body.style.setProperty('--card-160', "218px");
        document.body.style.setProperty('--card-592', "780px");
        document.body.style.setProperty('--py-2-scale', '14px');
        document.body.style.setProperty('--card-470', '650px');
        document.body.style.setProperty('--card-558', '755px');
        document.body.style.setProperty('--card-235', '325px');
        document.body.style.setProperty('--card-580', '765px');
        document.body.style.setProperty('--card-355', '515px');
        document.body.style.setProperty('--card-537', '699px');
        document.body.style.setProperty('--card-589', '769px');
        document.body.style.setProperty('--py-form', '1rem');
        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');
        document.body.style.setProperty('--zoom-livetrade', zoomLevelL);
        document.body.style.setProperty('--margin-top-sidebar', '2.75rem');
        document.body.style.setProperty('--margin-bottom-sidebar', '1.5rem');
        document.body.style.setProperty('--height-container-custom', '850px');
        //-90 for 80%
        document.body.style.setProperty('--card-667-90', "970px");//
        document.body.style.setProperty('--card-trading-90', "450px");//
        document.body.style.setProperty('--card-213-90', "290px");
        document.body.style.setProperty('--card-249-90', "400px");//
        document.body.style.setProperty('--card-75-90', "920px");//
        document.body.style.setProperty('--card-515-90', "675px");
        document.body.style.setProperty('--card-295-90', "300px");//
        document.body.style.setProperty('--card-292-90', "590px");//
        document.body.style.setProperty('--card-600-90', "900px");//
        document.body.style.setProperty('--card-199-90', "315px");//
        document.body.style.setProperty('--card-225-90', "290px");//
        document.body.style.setProperty('--card-170-90', "280px");//
        document.body.style.setProperty('--card-550-90', "850px");//
        document.body.style.setProperty('--card-grafik-90', "637px");//
        document.body.style.setProperty('--card-530-90', "845px");//
        document.body.style.setProperty('--card-500-90', "799px");//
        document.body.style.setProperty('--card-160-90', "260px");//
        document.body.style.setProperty('--card-592-90', "775px");
        document.body.style.setProperty('--py-2-scale-90', '22.2px');//
        document.body.style.setProperty('--card-470-90', '785px');//
        document.body.style.setProperty('--card-558-90', '870px');//
        document.body.style.setProperty('--card-235-90', '385px');//
        document.body.style.setProperty('--card-580-90', '885px');//
        document.body.style.setProperty('--card-355-90', '530px');//
        document.body.style.setProperty('--card-537-90', '836px');//
        document.body.style.setProperty('--card-589-90', '892px');//
        document.body.style.setProperty('--py-form-90', '2rem');//
        document.body.style.setProperty('--header-menu-scale-90', 'none');
        document.body.style.setProperty('--header-menu-90', 'block');
        document.body.style.setProperty('--zoom-livetrade-90', '1.49');//
        document.body.style.setProperty('--margin-top-sidebar-90', '3.70rem');
        document.body.style.setProperty('--margin-bottom-sidebar-90', '2.70rem');
        document.body.style.setProperty('--height-container-custom-90', '965px');//
        //-80 for 80%
        document.body.style.setProperty('--card-667-80', "1100px");//
        document.body.style.setProperty('--card-trading-80', "515px");//
        document.body.style.setProperty('--card-213-80', "300px");
        document.body.style.setProperty('--card-249-80', "480px");//
        document.body.style.setProperty('--card-75-80', "1052px");//
        document.body.style.setProperty('--card-515-80', "675px");
        document.body.style.setProperty('--card-295-80', "325px");//
        document.body.style.setProperty('--card-292-80', "695px");//
        document.body.style.setProperty('--card-600-80', "1035px");//
        document.body.style.setProperty('--card-199-80', "340px");//
        document.body.style.setProperty('--card-225-80', "370px");//
        document.body.style.setProperty('--card-170-80', "305px");//
        document.body.style.setProperty('--card-550-80', "980px");//
        document.body.style.setProperty('--card-grafik-80', "740px");//
        document.body.style.setProperty('--card-530-80', "970px");//
        document.body.style.setProperty('--card-500-80', "935px");//
        document.body.style.setProperty('--card-160-80', "305px");//
        document.body.style.setProperty('--card-592-80', "790px");
        document.body.style.setProperty('--py-2-scale-80', '27px');//
        document.body.style.setProperty('--card-470-80', '895px');//
        document.body.style.setProperty('--card-558-80', '1005px');//
        document.body.style.setProperty('--card-235-80', '450px');//
        document.body.style.setProperty('--card-580-80', '1015px');//
        document.body.style.setProperty('--card-355-80', '560px');//
        document.body.style.setProperty('--card-537-80', '935px');//
        document.body.style.setProperty('--card-589-80', '994px');//
        document.body.style.setProperty('--py-form-80', '3rem');//
        document.body.style.setProperty('--header-menu-scale-80', 'none');
        document.body.style.setProperty('--header-menu-80', 'block');
        document.body.style.setProperty('--zoom-livetrade-80', '1.65');//
        document.body.style.setProperty('--margin-top-sidebar-80', '4.90rem');//
        document.body.style.setProperty('--margin-bottom-sidebar-80', '3.70rem');//
        document.body.style.setProperty('--height-container-custom-80', '1095px');//
        this.setState({
            scalemode : zoomLevel,
            valueScale: "80"
        })
        this.props.changeScale("80");
    }

    changeScale90 = () => {
        var zoomLevelL = 1.1;

        var zoomLevel = 0.9;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

        document.body.style.setProperty('--card-667', "750px");
        document.body.style.setProperty('--card-trading', "335px");
        document.body.style.setProperty('--card-213', "245px");
        document.body.style.setProperty('--card-249', "280px");
        document.body.style.setProperty('--card-75', "700px");
        document.body.style.setProperty('--card-515', "590px");
        document.body.style.setProperty('--card-295', "300px");
        document.body.style.setProperty('--card-292', "370px");
        document.body.style.setProperty('--card-600', "690px");
        document.body.style.setProperty('--card-199', "230px");
        document.body.style.setProperty('--card-225', "240px");
        document.body.style.setProperty('--card-170', "200px");
        document.body.style.setProperty('--card-550', "630px");
        document.body.style.setProperty('--card-grafik', "395px");
        document.body.style.setProperty('--card-530', "620px");
        document.body.style.setProperty('--card-500', "580px");
        document.body.style.setProperty('--card-160', "185px");
        document.body.style.setProperty('--card-592', "655px");
        document.body.style.setProperty('--py-2-scale', '9.5px');
        document.body.style.setProperty('--card-470', '550px');
        document.body.style.setProperty('--card-558', '650px');
        document.body.style.setProperty('--card-235', '270px');
        document.body.style.setProperty('--card-580', '665px');
        document.body.style.setProperty('--card-355', '420px');
        document.body.style.setProperty('--card-537', '602px');
        document.body.style.setProperty('--card-589', '650px');
        document.body.style.setProperty('--py-form', '.5rem');
        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');
        document.body.style.setProperty('--zoom-livetrade', zoomLevelL);
        document.body.style.setProperty('--margin-top-sidebar', '1.75rem');
        document.body.style.setProperty('--margin-bottom-sidebar', '1rem');
        document.body.style.setProperty('--height-container-custom', '740px');
        //-90 for 90%
        document.body.style.setProperty('--card-667-90', "850px");
        document.body.style.setProperty('--card-trading-90', "385px");
        document.body.style.setProperty('--card-213-90', "290px");
        document.body.style.setProperty('--card-249-90', "325px");
        document.body.style.setProperty('--card-75-90', "800px");
        document.body.style.setProperty('--card-515-90', "675px");
        document.body.style.setProperty('--card-295-90', "295px");
        document.body.style.setProperty('--card-292-90', "465px");
        document.body.style.setProperty('--card-600-90', "785px");
        document.body.style.setProperty('--card-199-90', "255px");
        document.body.style.setProperty('--card-225-90', "280px");
        document.body.style.setProperty('--card-170-90', "223px");
        document.body.style.setProperty('--card-550-90', "720px");
        document.body.style.setProperty('--card-grafik-90', "483px");
        document.body.style.setProperty('--card-530-90', "715px");
        document.body.style.setProperty('--card-500-90', "675px");
        document.body.style.setProperty('--card-160-90', "218px");
        document.body.style.setProperty('--card-592-90', "775px");
        document.body.style.setProperty('--py-2-scale-90', '14px');
        document.body.style.setProperty('--card-470-90', '645px');
        document.body.style.setProperty('--card-558-90', '750px');
        document.body.style.setProperty('--card-235-90', '320px');
        document.body.style.setProperty('--card-580-90', '760px');
        document.body.style.setProperty('--card-355-90', '510px');
        document.body.style.setProperty('--card-537-90', '694px');
        document.body.style.setProperty('--card-589-90', '764px');
        document.body.style.setProperty('--py-form-90', '1rem');
        document.body.style.setProperty('--header-menu-scale-90', 'none');
        document.body.style.setProperty('--header-menu-90', 'block');
        document.body.style.setProperty('--zoom-livetrade-90', '1.25');
        document.body.style.setProperty('--margin-top-sidebar-90', '2.70rem');
        document.body.style.setProperty('--margin-bottom-sidebar-90', '1.5rem');
        document.body.style.setProperty('--height-container-custom-90', '845px');
        //-80 for 90%
        document.body.style.setProperty('--card-667-80', "970px");//
        document.body.style.setProperty('--card-trading-80', "450px");//
        document.body.style.setProperty('--card-213-80', "290px");
        document.body.style.setProperty('--card-249-80', "400px");//
        document.body.style.setProperty('--card-75-80', "920px");//
        document.body.style.setProperty('--card-515-80', "675px");
        document.body.style.setProperty('--card-295-80', "300px");//
        document.body.style.setProperty('--card-292-80', "590px");//
        document.body.style.setProperty('--card-600-80', "900px");//
        document.body.style.setProperty('--card-199-80', "315px");//
        document.body.style.setProperty('--card-225-80', "290px");//
        document.body.style.setProperty('--card-170-80', "280px");//
        document.body.style.setProperty('--card-550-80', "850px");//
        document.body.style.setProperty('--card-grafik-80', "637px");//
        document.body.style.setProperty('--card-530-80', "845px");//
        document.body.style.setProperty('--card-500-80', "799px");//
        document.body.style.setProperty('--card-160-80', "260px");//
        document.body.style.setProperty('--card-592-80', "775px");
        document.body.style.setProperty('--py-2-scale-80', '22.2px');//
        document.body.style.setProperty('--card-470-80', '785px');//
        document.body.style.setProperty('--card-558-80', '870px');//
        document.body.style.setProperty('--card-235-80', '385px');//
        document.body.style.setProperty('--card-580-80', '885px');//
        document.body.style.setProperty('--card-355-80', '530px');//
        document.body.style.setProperty('--card-537-80', '836px');//
        document.body.style.setProperty('--card-589-80', '892px');//
        document.body.style.setProperty('--py-form-80', '2rem');//
        document.body.style.setProperty('--header-menu-scale-80', 'none');
        document.body.style.setProperty('--header-menu-80', 'block');
        document.body.style.setProperty('--zoom-livetrade-80', '1.49');//
        document.body.style.setProperty('--margin-top-sidebar-80', '3.70rem');
        document.body.style.setProperty('--margin-bottom-sidebar-80', '2.70rem');
        document.body.style.setProperty('--height-container-custom-80', '965px');//
        this.setState({
            scalemode : zoomLevel,
            valueScale: "90"
        })
        this.props.changeScale("90");
    }

    changeScale100 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "25%");
        document.body.style.setProperty('--column-col-sm-2-4', "16.666667%");

        document.body.style.setProperty('--card-667', '667px');
        document.body.style.setProperty('--card-trading', '300px');
        document.body.style.setProperty('--card-213', '213px');
        document.body.style.setProperty('--card-249', '249px');
        document.body.style.setProperty('--card-75', '620px');
        document.body.style.setProperty('--card-515', '515px');
        document.body.style.setProperty('--card-295', '295px');
        document.body.style.setProperty('--card-292', '292px');
        document.body.style.setProperty('--card-600', '600px');
        document.body.style.setProperty('--card-199', '199px');
        document.body.style.setProperty('--card-225', '225px');
        document.body.style.setProperty('--card-170', '170px');
        document.body.style.setProperty('--card-550', '550px');
        document.body.style.setProperty('--card-grafik', "330px");
        document.body.style.setProperty('--card-530', "540px");
        document.body.style.setProperty('--card-500', "500px");
        document.body.style.setProperty('--card-160', "160px");
        document.body.style.setProperty('--card-592', "592px");
        document.body.style.setProperty('--py-2-scale', '.5rem');
        document.body.style.setProperty('--card-470', '470px');
        document.body.style.setProperty('--card-558', '570px');
        document.body.style.setProperty('--card-235', '235px');
        document.body.style.setProperty('--card-580', '580px');
        document.body.style.setProperty('--card-355', '355px');
        document.body.style.setProperty('--card-537', '537px');
        document.body.style.setProperty('--card-589', '589px');
        document.body.style.setProperty('--py-form', '0px');
        document.body.style.setProperty('--header-menu-scale', 'none');
        document.body.style.setProperty('--header-menu', 'block');
        document.body.style.setProperty('--zoom-livetrade', zoomLevelL);
        document.body.style.setProperty('--margin-top-sidebar', '1rem');
        document.body.style.setProperty('--margin-bottom-sidebar', '.25rem');
        document.body.style.setProperty('--height-container-custom', '662px');
        //-90 for 100%
        document.body.style.setProperty('--card-667-90', "750px");
        document.body.style.setProperty('--card-trading-90', "335px");
        document.body.style.setProperty('--card-213-90', "245px");
        document.body.style.setProperty('--card-249-90', "280px");
        document.body.style.setProperty('--card-75-90', "700px");
        document.body.style.setProperty('--card-515-90', "590px");
        document.body.style.setProperty('--card-295-90', "300px");
        document.body.style.setProperty('--card-292-90', "370px");
        document.body.style.setProperty('--card-600-90', "690px");
        document.body.style.setProperty('--card-199-90', "230px");
        document.body.style.setProperty('--card-225-90', "240px");
        document.body.style.setProperty('--card-170-90', "200px");
        document.body.style.setProperty('--card-550-90', "630px");
        document.body.style.setProperty('--card-grafik-90', "395px");
        document.body.style.setProperty('--card-530-90', "620px");
        document.body.style.setProperty('--card-500-90', "580px");
        document.body.style.setProperty('--card-160-90', "185px");
        document.body.style.setProperty('--card-592-90', "655px");
        document.body.style.setProperty('--py-2-scale-90', '9.5px');
        document.body.style.setProperty('--card-470-90', '550px');
        document.body.style.setProperty('--card-558-90', '650px');
        document.body.style.setProperty('--card-235-90', '270px');
        document.body.style.setProperty('--card-580-90', '665px');
        document.body.style.setProperty('--card-355-90', '420px');
        document.body.style.setProperty('--card-537-90', '602px');
        document.body.style.setProperty('--card-589-90', '650px');
        document.body.style.setProperty('--py-form-90', '.5rem');
        document.body.style.setProperty('--header-menu-scale-90', 'none');
        document.body.style.setProperty('--header-menu-90', 'block');
        document.body.style.setProperty('--zoom-livetrade-90', '1.1');
        document.body.style.setProperty('--margin-top-sidebar-90', '1.75rem');
        document.body.style.setProperty('--margin-bottom-sidebar-90', '1rem');
        document.body.style.setProperty('--height-container-custom-90', '740px');
        this.setState({
            scalemode : zoomLevel,
            valueScale: "100"
        })
        this.props.changeScale("100");
    }

    changeScale110 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1.1;
        $('html').css({ zoom: zoomLevel });

        document.body.style.setProperty('--column-col-sm-3-6', "50%");
        document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");

        document.body.style.setProperty('--card-667', '667px');
        document.body.style.setProperty('--card-trading', '300px');
        document.body.style.setProperty('--card-213', '213px');
        document.body.style.setProperty('--card-249', '249px');
        document.body.style.setProperty('--card-75', '620px');
        document.body.style.setProperty('--card-515', '515px');
        document.body.style.setProperty('--card-295', '295px');
        document.body.style.setProperty('--card-292', '292px');
        document.body.style.setProperty('--card-600', '600px');
        document.body.style.setProperty('--card-199', '199px');
        document.body.style.setProperty('--card-225', '225px');
        document.body.style.setProperty('--card-170', '170px');
        document.body.style.setProperty('--card-550', '550px');
        document.body.style.setProperty('--card-grafik', "330px");
        document.body.style.setProperty('--card-530', "540px");
        document.body.style.setProperty('--card-500', "500px");
        document.body.style.setProperty('--card-160', "160px");
        document.body.style.setProperty('--card-592', "592px");
        document.body.style.setProperty('--py-2-scale', '.35rem');/**/
        document.body.style.setProperty('--card-470', '470px');
        document.body.style.setProperty('--card-558', '570px');
        document.body.style.setProperty('--card-235', '235px');
        document.body.style.setProperty('--card-580', '580px');
        document.body.style.setProperty('--card-355', '320px');/**/
        document.body.style.setProperty('--card-537', '537px');
        document.body.style.setProperty('--card-589', '578px');/**/
        document.body.style.setProperty('--py-form', '0px');
        document.body.style.setProperty('--header-menu-scale', 'block');
        document.body.style.setProperty('--header-menu', 'none');
        document.body.style.setProperty('--zoom-livetrade', '0.98');/**/
        document.body.style.setProperty('--margin-top-sidebar', '1rem');
        document.body.style.setProperty('--margin-bottom-sidebar', '.25rem');
        document.body.style.setProperty('--height-container-custom', '662px');
        //-90 for 110%
        document.body.style.setProperty('--card-667-90', "750px");
        document.body.style.setProperty('--card-trading-90', "335px");
        document.body.style.setProperty('--card-213-90', "245px");
        document.body.style.setProperty('--card-249-90', "280px");
        document.body.style.setProperty('--card-75-90', "700px");
        document.body.style.setProperty('--card-515-90', "590px");
        document.body.style.setProperty('--card-295-90', "300px");
        document.body.style.setProperty('--card-292-90', "370px");
        document.body.style.setProperty('--card-600-90', "690px");
        document.body.style.setProperty('--card-199-90', "230px");
        document.body.style.setProperty('--card-225-90', "240px");
        document.body.style.setProperty('--card-170-90', "200px");
        document.body.style.setProperty('--card-550-90', "630px");
        document.body.style.setProperty('--card-grafik-90', "395px");
        document.body.style.setProperty('--card-530-90', "620px");
        document.body.style.setProperty('--card-500-90', "580px");
        document.body.style.setProperty('--card-160-90', "185px");
        document.body.style.setProperty('--card-592-90', "655px");
        document.body.style.setProperty('--py-2-scale-90', '0.35rem');/**/
        document.body.style.setProperty('--card-470-90', '550px');
        document.body.style.setProperty('--card-558-90', '650px');
        document.body.style.setProperty('--card-235-90', '270px');
        document.body.style.setProperty('--card-580-90', '665px');
        document.body.style.setProperty('--card-355-90', '388px');/**/
        document.body.style.setProperty('--card-537-90', '599px');/**/
        document.body.style.setProperty('--card-589-90', '626px');/**/
        document.body.style.setProperty('--py-form-90', '.5rem');
        document.body.style.setProperty('--header-menu-scale-90', 'none');
        document.body.style.setProperty('--header-menu-90', 'block');
        document.body.style.setProperty('--zoom-livetrade-90', '1.05');/**/
        document.body.style.setProperty('--margin-top-sidebar-90', '1.75rem');
        document.body.style.setProperty('--margin-bottom-sidebar-90', '1rem');
        document.body.style.setProperty('--height-container-custom-90', '740px');
        this.setState({
            scalemode : zoomLevel,
            valueScale: "110"
        })
        this.props.changeScale("110");
    }

    changeScale120 = () => {
        var zoomLevelL = 1;

        var zoomLevel = 1.2;
        $('html').css({ zoom: zoomLevel });


        document.body.style.setProperty('--column-col-sm-3-6', "50%");
        document.body.style.setProperty('--column-col-sm-2-4', "33.333333%");

        document.body.style.setProperty('--card-667', '667px');
        document.body.style.setProperty('--card-trading', '300px');
        document.body.style.setProperty('--card-213', '213px');
        document.body.style.setProperty('--card-249', '249px');
        document.body.style.setProperty('--card-75', '620px');
        document.body.style.setProperty('--card-515', '515px');
        document.body.style.setProperty('--card-295', '295px');
        document.body.style.setProperty('--card-292', '292px');
        document.body.style.setProperty('--card-600', '600px');
        document.body.style.setProperty('--card-199', '199px');
        document.body.style.setProperty('--card-225', '225px');
        document.body.style.setProperty('--card-170', '170px');
        document.body.style.setProperty('--card-550', '550px');
        document.body.style.setProperty('--card-grafik', "330px");
        document.body.style.setProperty('--card-530', "540px");
        document.body.style.setProperty('--card-500', "500px");
        document.body.style.setProperty('--card-160', "160px");
        document.body.style.setProperty('--card-592', "592px");
        document.body.style.setProperty('--py-2-scale', '.35rem');/**/
        document.body.style.setProperty('--card-470', '470px');
        document.body.style.setProperty('--card-558', '570px');
        document.body.style.setProperty('--card-235', '235px');
        document.body.style.setProperty('--card-580', '580px');
        document.body.style.setProperty('--card-355', '327px');/**/
        document.body.style.setProperty('--card-537', '550px');/**/
        document.body.style.setProperty('--card-589', '583px');/**/
        document.body.style.setProperty('--py-form', '0px');
        document.body.style.setProperty('--header-menu-scale', 'block');
        document.body.style.setProperty('--header-menu', 'none');
        document.body.style.setProperty('--zoom-livetrade', '0.98');/**/
        document.body.style.setProperty('--margin-top-sidebar', '1rem');
        document.body.style.setProperty('--margin-bottom-sidebar', '.25rem');
        document.body.style.setProperty('--height-container-custom', '662px');
        //-90 for 120%
        document.body.style.setProperty('--card-667-90', "750px");
        document.body.style.setProperty('--card-trading-90', "335px");
        document.body.style.setProperty('--card-213-90', "245px");
        document.body.style.setProperty('--card-249-90', "280px");
        document.body.style.setProperty('--card-75-90', "700px");
        document.body.style.setProperty('--card-515-90', "590px");
        document.body.style.setProperty('--card-295-90', "300px");
        document.body.style.setProperty('--card-292-90', "370px");
        document.body.style.setProperty('--card-600-90', "690px");
        document.body.style.setProperty('--card-199-90', "230px");
        document.body.style.setProperty('--card-225-90', "240px");
        document.body.style.setProperty('--card-170-90', "200px");
        document.body.style.setProperty('--card-550-90', "630px");
        document.body.style.setProperty('--card-grafik-90', "395px");
        document.body.style.setProperty('--card-530-90', "620px");
        document.body.style.setProperty('--card-500-90', "580px");
        document.body.style.setProperty('--card-160-90', "185px");
        document.body.style.setProperty('--card-592-90', "655px");
        document.body.style.setProperty('--py-2-scale-90', '0.35rem');/**/
        document.body.style.setProperty('--card-470-90', '550px');
        document.body.style.setProperty('--card-558-90', '650px');
        document.body.style.setProperty('--card-235-90', '270px');
        document.body.style.setProperty('--card-580-90', '665px');
        document.body.style.setProperty('--card-355-90', '392px');/**/
        document.body.style.setProperty('--card-537-90', '602px');
        document.body.style.setProperty('--card-589-90', '630px');/**/
        document.body.style.setProperty('--py-form-90', '.5rem');
        document.body.style.setProperty('--header-menu-scale-90', 'none');
        document.body.style.setProperty('--header-menu-90', 'block');
        document.body.style.setProperty('--zoom-livetrade-90', '1.04');/**/
        document.body.style.setProperty('--margin-top-sidebar-90', '1.75rem');
        document.body.style.setProperty('--margin-bottom-sidebar-90', '1rem');
        document.body.style.setProperty('--height-container-custom-90', '740px');
        this.setState({
            scalemode : zoomLevel,
            valueScale: "120"
        })
        this.props.changeScale("120");
    }

    render() {
        return (
            <div>
                <div className="col align-item-center"> 
                    <div className="text-white setting align-items-center">
                    {/* <div className="border-bottom"> */}
                        <div className="form-group row mb-0">
                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                    Language
                                </div>
                            </div>

                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                    Time zone
                                </div>
                            </div>
                        </div>

                        <div className="form-group row mb-0">
                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                                    <Dropdown placeholder='Choose' search selection options={stateLanguages} className="col-sm-12 f-12"/>                                                        
                                </div>
                            </div>
                            <div class="col-sm-5 mx-0 mb-2 ">
                                <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                                    <Dropdown placeholder='Choose' search selection options={stateTimeZone} className="col-sm-12 f-12"/>                                                                                        
                                </div>
                            </div>
                        </div>
                    {/* </div> */}

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Theme Settings
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-3 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center" >
                            <input type="radio" class="radio_item" value="" name="itemTheme" id="radio1" onClick={
                                (e) => {
                                    this.setState({
                                        valueTheme: "night"
                                    });
                                    this.props.isNight(true);
                                }
                            } checked={this.state.valueTheme === "night" ? true : false}/>
                                <label class="label_item" htmlFor="radio1"> <i className="logo-dark-theme"/> </label>
                            </div>
                        </div>
                        <div class="col-sm-3 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                            <input type="radio" class="radio_item" value="" name="itemTheme" id="radio2" onClick={
                                (e) => {
                                    this.setState({
                                        valueTheme: "light"
                                    });
                                    this.props.isNight(false);
                                }
                            } checked={this.state.valueTheme === "light" ? true : false} />
                                <label class="label_item" htmlFor="radio2"> <i className="logo-light-theme"/> </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Interface Scale
                            </div>
                            <div className="ui small input col-sm-12 f-9 text-center align-self-center danger-text">
                                *) Not compatible in Mozilla Firefox
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0 pl-4">
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                                
                                <input class="magic-radio" type="radio" name="scale" id="scale1" value="option" onClick={this.changeScale80} checked={this.state.valueScale === "80" ? true : false} />
                                <label htmlFor="scale1" className="text-white">
                                80 %
                                </label>
    
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale2" value="option" onClick={this.changeScale90} checked={this.state.valueScale === "90" ? true : false}/>
                                <label htmlFor="scale2" className="text-white">
                                90 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale3" value="option" onClick={this.changeScale100} checked={this.state.valueScale === "100" ? true : false}/>
                                <label htmlFor="scale3" className="text-white">
                                100 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale4" value="option" onClick={this.changeScale110} checked={this.state.valueScale === "110" ? true : false}/>
                                <label htmlFor="scale4" className="text-white">
                                110 %
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-2 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-100">
                            <input class="magic-radio" type="radio" name="scale" id="scale5" value="option" onClick={this.changeScale120} checked={this.state.valueScale === "120" ? true : false}/>
                                <label htmlFor="scale5" className="text-white">
                                120 %
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-6 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Balance/Limit displayed at the top
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0 pl-4">
                        <div class="col-sm-4 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                            <input class="magic-radio" type="radio" name="balance" id="a" value="option" onClick={
                                (e) => {
                                    this.setState({
                                        valueBalance: "0"
                                    });
                                }
                            } checked={this.state.valueBalance === "0" ? true : false}/>
                                <label htmlFor="a" className="text-white f-10-center">
                                Always show the "Total" amount
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-4 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                            <input class="magic-radio" type="radio" name="balance" id="b" value="option" onClick={
                                (e) => {
                                    this.setState({
                                        valueBalance: "1"
                                    });
                                }
                            } checked={this.state.valueBalance === "1" ? true : false}/>
                                <label htmlFor="b" className="text-white f-10-center">
                                Hide account balance/limit
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                   
                </div>
                <div className="form-group row mb-0">
                        <div class="col-sm-12 mx-0 mb-2 pl-5">
                            <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                        </div>
                    </div>
                </div> 
            </div>
            
            
        );
    }
}

class TabPrivacy extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        valuePinUsage : "0",
    }

    render() {
        const imgdisplay = {
            display: 'inline-flex',
            paddingTop: '3px'
            };
            
            const paddingParagraph = {
            padding: '10px'
            }
            
            const divMargin = {
            marginBottom: '15px'
            }
            
            const imgUser = {
            margin: 'auto',
            backgroundColor: '#3c3c3c',
            borderBottom: '2px solid #1A1A1A'
            }
        return (
            <div>
            <div className="col align-item-center"> 
                <div className="text-white setting align-items-center">
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                                Privacy Settings
                            </div>
                        </div>
                    </div>                        
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                Email
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                               <input type="text"/>
                            </div>
                        </div>
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                                <button className="btn btn-md btn-primary">Changes</button>
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-9 text-right">
                                <i className="text-blue">Current email</i>
                            </div>
                        </div>
                    </div>
                {/* </div> */}

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Profile Photo
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-1 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center">
                            <div className="col-md-12" style={imgdisplay}>  
                                <img src={user_avatar} alt="User" className="img-avatar d-border mr-2" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-3 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center ver-center">
                            <button className="btn btn-md btn-primary">Upload</button>
                        </div>
                    </div>
                </div>

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            Pin Usage
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0 pl-4">
                    <div class="col-sm-4 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                        <input class="magic-radio" type="radio" name="balance" id="a" value="option" onClick={
                            (e) => {
                                this.setState({
                                    valuePinUsage: "0"
                                });
                            }
                        } checked={this.state.valuePinUsage === "0" ? true : false}/>
                            <label htmlFor="a" className="text-white f-12-center">
                            Always use PIN
                            </label>
                        </div>
                    </div>
                    <div class="col-sm-4 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center border-gray-tradding p-2 w-300">
                        <input class="magic-radio" type="radio" name="balance" id="b" value="option" onClick={
                            (e) => {
                                this.setState({
                                    valuePinUsage: "1"
                                });
                            }
                        } checked={this.state.valuePinUsage === "1" ? true : false}/>
                            <label htmlFor="b" className="text-white f-12-center">
                            Once PIN
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-6 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center danger-text">
                            *) Only use PIN for 1st transaction each Login
                        </div>
                    </div>
                </div>
                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>

               
            </div>
            <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 pl-5">
                        <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                    </div>
                </div>
            </div>
        </div>  
        );
    }
}

class TabNotification extends React.Component {
    render() {
        return (
            <div>
            <div className="col align-item-center"> 
                <div className="text-white setting align-items-center">
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-14 text-center align-self-center text-white">
                                Notification Settings
                            </div>
                        </div>
                    </div>                        
                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                
                            </div>
                        </div>
                    </div>

                    <div className="form-group row mb-0">
                        <div class="col-sm-5 mx-0 mb-2 ">
                            <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                                NOTIFICATION ON THE PLATFORM
                            </div>
                        </div>
                    </div>
        
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif1" id="notif1" value="option"/>
                                <label htmlFor="notif1" className="text-white f-12-center">
                                Notify me when my Forex/CFD position is about to close
                                </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif2" id="notif2" value="option"/>
                                <label htmlFor="notif2" className="text-white f-12-center">
                                Notify me of my new position in the rating this week
                                </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif3" id="notif3" value="option"/>
                                <label htmlFor="notif3" className="text-white f-12-center">
                                Price Alert Set
                                </label>
                        </div>
                    </div>
                </div>

                <div class="ui section divider small  col-sm-12 f-12 text-center align-self-center"></div>
               
                <div className="form-group row mb-0">
                    <div class="col-sm-5 mx-0 mb-2 ">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center text-white">
                            IN-BROWSER NOTIFICATION
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif4" id="notif4" value="option"/>
                                <label htmlFor="notif4" className="text-white f-12-center">
                                Background Push Notifications
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Account Activity
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif5" id="notif5" value="option"/>
                                <label htmlFor="notif5" className="text-white f-12-center">
                                Closed trades
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Receive the resuilt of trades even while you are away
                        </div>
                    </div>
                </div>


                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif6" id="notif6" value="option"/>
                                <label htmlFor="notif6" className="text-white f-12-center">
                                Successful withdrawal
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;We Will let you know once the request is appoved
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif7" id="notif7" value="option"/>
                                <label htmlFor="notif7" className="text-white f-12-center">
                                Pending orders
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Receive notifications when your pending orders get executed or canceled
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 p-2">
                        <div class="ui small input col-sm-12 f-12 text-center align-self-center pl-5">
                            <input class="magic-checkbox" type="checkbox" name="notif8" id="notif8" value="option"/>
                                <label htmlFor="notif8" className="text-white f-12-center">
                                Margin trading notifications
                                </label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-0 pl-5">
                        <div class="ui small input col-sm-12 f-9 text-center align-self-center text-gray-tradding pl-5">
                            &nbsp;&nbsp;Margin trading notifications
                        </div>
                    </div>
                </div>

            </div>
            <div className="form-group row mb-0">
                    <div class="col-sm-12 mx-0 mb-2 pl-5">
                        <button type="submit" className="btn btn-primary pull-left"> <i class="logo-btn-save"></i> Save Setting </button>                           
                    </div>
                </div>
            </div>
        </div>
        
            
        );
    }
}

const TabAppearance = ContextConnector(BIPSAppContext,
    (vars, actions) => ({
        thememode: vars.thememode,
        isNight : (thememode)=> {actions.sendAction('isNight', {thememode})},
        scaleState : vars.scaleState,
        changeScale : (scaleState) => {actions.sendAction('changeScale', {scaleState})}
    }),
)(TabAppearance_Base);

export default ModalSetting;