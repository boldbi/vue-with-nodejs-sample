<template>
  <div id="app" ref="app">
    <div id="dashboard" ref="dashboard">
      <div id="errorModal" class="modal" v-show="showErrorModal">
        <p class="error-message">{{ errorMessage }} Please use this <a href="https://help.boldbi.com/site-administration/embed-settings/" target="_blank">link</a> to obtain the Json file from the Bold BI server.</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
window.jQuery = $
export default {
name: 'App',
data() {
    return {
    errorMessage: '',
    };
},
async mounted() {
        var scripts = [
            'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js',
        ];
        scripts.forEach((script) => {
            let tag = document.createElement('script');
            tag.setAttribute('src', script);
            tag.setAttribute('type', 'text/javascript');
            tag.setAttribute('defer', 'defer');
            tag.async = true;
            document.head.appendChild(tag);
        });


        //NodeJs application would be run on http://localhost:8080, which needs to be set as `apiHost`.
        let ApiHost = 'http://localhost:8080';

        try {
            const response = await fetch(ApiHost + '/getdetails');
            const data = await response.json();
            renderDashboard(data);
        }catch (error) {
            this.errorMessage = 'To compile and run the project, an embed config file needs to be required.';
            this.showErrorModal = true;
        }

        function renderDashboard(data) {
        let dashboard = BoldBI.create({
            serverUrl: data.ServerUrl + '/' + data.SiteIdentifier,
            dashboardId: data.DashboardId,
            embedContainerId: 'dashboard',
            width: '100%',
            height: window.innerHeight + 'px',
            authorizationServer: {
              url: ApiHost + "/authorizationserver"
            }
        });
        dashboard.loadDashboard();
        }
    }
};
</script>
<style>
.error-message {
  color: red;
  text-align: center;
  font-size: 20px;
  margin-top: 300px
}
</style>