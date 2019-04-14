(() => {
	const form = document.getElementById('visit-form');
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const data = {
			goodFriday: [],
		};

		for (let i = 0; i < e.target.length; i++) {
			const { name, value, checked } = e.target[i];

			if (!name) {
				continue;
			}

			if (name === 'service') {
				if (checked) {
					data[name] = value;
				}
			} else if (name === 'name' || name === 'email') {
				data[name] = value;
			} else {
				if (checked) {
					data.goodFriday.push(name);
				}
			}
		}

		const formBtn = document.getElementById('form-submit');
		formBtn.setAttribute('disabled', 'true');
		formBtn.innerText = 'Sending...';
		fetch('https://api.flatlandchurch.com/v2/forms/ad3456f1-62c2-4084-903c-43fde540f19b?key=202f1c42-7054-46ee-8ca2-ddc85f9c789b', {
			body: JSON.stringify(data),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(() => {
			document.getElementById('visit-form').remove();

			const h3 = document.createElement('h3');
			h3.innerText = 'We can\'t wait to see you this Easter! Thanks for letting us know we\'ll be seeing you.';

			document.getElementById('visit-section').append(h3);
		});
	});
})();