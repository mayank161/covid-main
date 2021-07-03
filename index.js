let data;
      const g = document.getElementsByClassName('glob');
      const glob = g[0].children
      const glob2= g[1].children
      const h1 = document.getElementById('h1');
      let total;
      const p = document.getElementById('det');

      function fn(e){
          try {
            //   console.log(e.target.value)
              const index = e.target.value;
          
            if(index == -1) {
                h1.innerHTML = 'Covid 19 Global Cases';
                // console.log(data.data.Global);
                p.innerHTML = '';
                const global = data.data.Global
           
                glob[0].innerHTML = `TotalConfirmed <br> ${global.TotalConfirmed}`
                glob[1].innerHTML = `TotalDeaths <br> ${global.TotalDeaths}`
                glob[2].innerHTML = `TotalRecovered <br> ${global.TotalRecovered}`
                glob2[0].innerHTML = `NewConfirmed <br> ${global.NewConfirmed}`
                glob2[1].innerHTML = `NewDeaths <br> ${global.NewDeaths}`
                glob2[2].innerHTML = `NewRecovered <br> ${global.NewRecovered}`
            }
            else {
                const countries = data.data.Countries[index];
                const percent = (countries.TotalConfirmed/total * 100);
                p.innerHTML = `${percent.toFixed(4)}% _of cases are founded in ${countries.Country} out of total cases in world`
                h1.innerHTML = `Covid 19 ${countries.Country} Cases`
                glob[0].innerHTML = `TotalConfirmed <br> ${countries.TotalConfirmed}`
                glob[1].innerHTML = `TotalDeaths <br> ${countries.TotalDeaths}`
                glob[2].innerHTML = `TotalRecovered <br> ${countries.TotalRecovered}`
                glob2[0].innerHTML = `NewConfirmed <br> ${countries.NewConfirmed}`
                glob2[1].innerHTML = `NewDeaths <br> ${countries.NewDeaths}`
                glob2[2].innerHTML = `NewRecovered <br> ${countries.NewRecovered}`
            }
          } catch (error) {
              console.log(error);
              alert('something went wrong') 
          }
        }

      async function call() {
          try {
              data = await axios.get('https://api.covid19api.com/summary');
            //   console.log(data.data);

              const global = data.data.Global
              total = global.TotalConfirmed;
              glob[0].innerHTML = `TotalConfirmed <br> ${global.TotalConfirmed}`
              glob[1].innerHTML = `TotalDeaths <br> ${global.TotalDeaths}`
              glob[2].innerHTML = `TotalRecovered <br> ${global.TotalRecovered}`
              glob2[0].innerHTML = `NewConfirmed <br> ${global.NewConfirmed}`
              glob2[1].innerHTML = `NewDeaths <br> ${global.NewDeaths}`
              glob2[2].innerHTML = `NewRecovered <br> ${global.NewRecovered}`
              const countries = data.data.Countries;
              const table = document.getElementById('table');
              const select = document.getElementById('option');
              for(let i=0; i<countries.length; i++) {
                  const country = countries[i]
                  const template = `
                  <tr>
                      <td>${i+1}</td>
                      <td>${country.Country}</td>
                      <td>${country.TotalConfirmed}</td>
                      <td>${country.TotalDeaths}</td>
                      <td>${country.TotalRecovered}</td>
                  </tr>`;

                  const option = ` <option value="${i}">${country.Country}</option>`

                  table.innerHTML += template
                  select.innerHTML += option;
               }
          } catch (error) {
              console.log(error);
              alert('something went wrong');
          }
      }
call();