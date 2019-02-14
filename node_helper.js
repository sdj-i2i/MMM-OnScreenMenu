/* Magic Mirror
 * Node Helper: Calendar
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const fs = require('fs');

module.exports = NodeHelper.create({
	// Override start method.
	start: function() {
		console.log("Starting node helper for: " + this.name);
	},

	// Override socketNotificationReceived method.
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === "GET_DASHBOARD_MODULES") {
			let jsonData = this.getDashboardModules();
			jsonData = (jsonData) ? JSON.parse(jsonData.toString('utf8')) : {};
			self.sendSocketNotification("GET_DASHBOARD_MODULES", {
				modules: jsonData
			});
		}
	},

	getDashboardModules: function() {
		return fs.readFileSync(__dirname + '/dashboardModules.json');
	}
});
