$(document).ready(() => {
    let species = [];
    $.getJSON('../species.json', (data) => {
        species = data;
        displaySpecies(data);
    });

    let searchInput = $('#search');
    searchInput.on('keyup', () => {
        console.log('searchInput=', searchInput, '\n...val()=', searchInput.val());
        const filteredSpecies = filter(species, searchInput.val());
        displaySpecies(filteredSpecies);
    })
});

/**
 * @description filter species based on `filterTerm` 
 * @param {Object[]} speciesList List of species
 * @param {string} filterTerm Filter value
 */
const filter = (speciesList, filterTerm) => {
    console.log('filter=', filterTerm);
    if (!filterTerm) return speciesList;
    const term = filterTerm.toLowerCase();
    return speciesList.filter(species => {
        let i = 0;
        while (i < species.filterName.length) {
            //The problem is that we don't want to run filterTerm.toLowerCase() every species.length*species.filterName.length times (so about O(n^2))
            if (species.filterName[i].includes(term)) return true; //Let's try!! /True then the next one false? Yup
            ++i; //to go through the filterName array
        }
        return false;
    });
};

/**
 * @description Display species' details contained in *data*.
 * @param {Object[]} speciesList Species list
 */
const displaySpecies = (speciesList) => {
    let items = speciesList
        .map(species => `
			<article class="list--item">
					<figure>
						<a href="${species.url}"><img
								src="${species.imgUrl}" alt="${species.altText}"></a>
						<header>
							<h2>${species.title}</h2>
						</header>
						<figcaption>
							${species.caption}
						</figcaption>
					</figure>
		</article>`);
    $('.list').html(items.length ? items.join('') : '<h3 style="color: #2fbd82; font-size: 35px; margin: 0 auto; padding: 20px">Sorry but no species were found by that name!</h3>');
};