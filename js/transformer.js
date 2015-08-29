'use strict';

var Transformer = {
	initialize: function(element) {
		var item = {};

		for (var tuple in element.tuples) {
			item[element.tuples[tuple].label] = element.tuples[tuple].value;
		};
		return item;
	},
	// this is for next step
	// to execute as Transformer.change(method);
	change: function(method) {
		return (typeof Transformer[method] == 'function') ? Transformer[method](item) : Transformer.defaultTransform(item);
	},

	personalDataTransform: function(item) {
		return {
			label: item.label,
			value: item.value
		};
	},
	educationTransform: function(item) {
		return {
			title: item.school,
			subtitle: item.location,
			label: item.from + ' - ' + item.to,
			value: item.description
		};
	},
	workExperienceTransform: function(item) {
		return {
			title: item.company,
			label: item.from + ' - ' + item.to,
			value: item.description
		};
	},
	projectsTransform: function(item) {
		return this.workExperienceTransform(item);
	},
	skillsTransform: function(item) {
		return {
			label: item.group,
			value: item.skills
		};
	},
	achievementsAndAwardsTransform: function(item) {
		return {
			// title: item.company,
			// subtitle: item.location,
			label: item.when,
			value: item.description
		};
	},
	languagesTransform: function(item) {
		return {
			label: item.language,
			value: item.level
		};
	},
	interestsAndActivitiesTransform: function(item) {
		return {
			value: item.value
		};
	},
	defaultTransform: function(item) {
		return {
			label: item.label,
			value: item.value
		};
	}
};