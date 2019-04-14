(() => {
	window.addToCalendar = (data) => {
		const iOSRegexpr = /OS ((\d+_?){2,3})\s/;

		if (iOSRegexpr.test(window.navigator.userAgent)) {
			window.open(`data:text/calendar;charset=utf8,${createICalLink(data)}`)
		} else {
			window.open(createGoogleCalendarLink(data), '_blank');
		}
	};

	const createICalLink = ({ starttime, endtime, title, location, description }) => {
		const link = ([
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'BEGIN:VEVENT',
			'DTSTAMP:20190421T170000Z',
			`DTSTART:${starttime}`,
			`DTEND:${endtime}`,
			`LOCATION:${location}`,
			`SUMMARY:${title}`,
			`DESCRIPTION:${description}`,
			'END:VEVENT',
			'END:VCALENDAR',
		]).join('\n');
		return encodeURIComponent(link);
	};

	const createGoogleCalendarLink = ({ starttime, endtime, title, location, description }) => {
		const query = {
			action: 'TEMPLATE',
			dates: `${starttime}/${endtime}`,
			text: title,
			location,
			details: description,
		};

		return `http://www.google.com/calendar/event?${Object
			.keys(query)
			.map((k) => `${k}=${encodeURIComponent(query[k])}`)
			.join('&')}`;
	}
})();
