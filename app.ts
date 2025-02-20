// 1 способ получения ссылок элементов из HTML
const list = document.getElementById('list') as HTMLElement;
// 2 способ получения ссылок элементов из HTML
const filter = document.querySelector('#filter') as HTMLElement | null;
//проверка на получение null, если null то выдавать сообщение
if (!list || !filter) {
    throw new Error('Элемент отсутствует')
}

interface User{

    id: number;
    name: string;

}

let USERS:User[] = []

filter.addEventListener('input', (event:Event):void => {
    //вывод отдельно момента, когда пользователь выбирает место, где писать текст + плюс точно говорю, что данное действие есть
    const target = event.target as HTMLInputElement
    // получение значения из строки поиска в нижнем регистре
    const value:string = target.value.toLowerCase()
    //
    const filteredUsers:User[] = USERS.filter((user:User):boolean =>
        user.name.toLowerCase().includes(value)
    )
    render(filteredUsers)
})


async function start(): Promise<void> {
    list.innerHTML = 'Loading...'
    try {
        const resp: Response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data:User[] = await resp.json()
        setTimeout(():void => {
            USERS = data
            render(data)
        }, 2000)
        //проверка на получения ошибки
        // тип у err: unknown - по умолчанию.
    } catch (err: unknown) {
        list.style.color = 'red';
        //если ошибка , то выдавать сообщение
        if (err instanceof Error) {
            list.innerHTML = err.message
        }

    }
}

function render(users:User[] = []):void {
    //проверка на пустой массив, если пуст то выдавать сообщение
    if (users.length === 0) {
        list.innerHTML = 'Ничего не найдено!'
    } else {
        //отображение списка пользователь
        //html подсвечивалось желтым, избыточная константа, которая использовалась один раз.
        //const html:string = users.map(toHTML).join('')
        list.innerHTML = users.map(toHTML).join('')
    }
}

function toHTML(user:User):string {
    return `
    <li class="list-group-item">${user.name}</li>
  `
}

start()
