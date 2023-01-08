document.addEventListener('DOMContentLoaded', async() => {
    let res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    let json = await res.json();

    const users = json.results.map((user) => {
        return {
            name: `${user.name.first} ${user.name.last}`,
            picture: user.picture,
            age: user.dob.age,
            gender: user.gender
        }
    });
    //console.log(users);

    document.querySelector('input[type=submit]').addEventListener('click', (e) => {
        e.preventDefault();
        let result = users.filter((user) => {
            return user.name.toLowerCase().indexOf(document.querySelector('input[type=text]').value.toLowerCase()) != -1;
        });
        //console.log(result);

        let number = result.reduce(function(acc, cur) {
            return acc + 1
        }, 0);

        let html = `<p>${number} usuário(s) encontrado(s)</p><br>`;

        result.forEach((user) => {
            html += `<div><img src='${user.picture.thumbnail}' style='border-radius:50%'> ${user.name}, ${user.age} anos</div><br>`
        });

        document.querySelector('#results').innerHTML = html;

        let sum_age = result.reduce(function(acc, cur) {
            return acc += cur.age
        }, 0);
        //console.log(sum_age);

        let avg_age = sum_age/result.length;
        //console.log(avg_age);

        let male = result.filter((user) => {return user.gender == 'male'});
        //console.log(male);

        let female = result.filter((user) => {return user.gender == 'female'});
        //console.log(female);

        document.querySelector('#statistics').innerHTML = `
        <h1>Estatísticas</h1>
        <br>
        <p>Homens: ${male.length}</p>
        <p>Mulheres: ${female.length}</p>
        <p>Soma das idades: ${sum_age}</p>
        <p>Média das idades: ${avg_age}</p>
        `;
    });
});