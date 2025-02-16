const list:HTMLElement | null = document.querySelector('#list')
const filter:HTMLElement | null = document.querySelector('#filter')
let USERS:any[] = []

filter.addEventListener('input', (event:Event):void => {
    // @ts-ignore
    const value:any = event.target.value.toLowerCase()
    const filteredUsers:any[] = USERS.filter((user:any):any =>
        user.name.toLowerCase().includes(value)
    )
    render(filteredUsers)
})

// @ts-ignore
async function start(): Promise<void> {
    list.innerHTML = 'Loading...'
    try {
        const resp:Response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data:any = await resp.json()
        setTimeout(():void => {
            USERS = data
            render(data)
        }, 2000)
    } catch (err) {
        list.style.color = 'red'
        list.innerHTML = err.message
    }
}

function render(users:any[] = []):void {
    if (users.length === 0) {
        list.innerHTML = 'Ничего не найдено!'
    } else {
        const html:string = users.map(toHTML).join('')
        list.innerHTML = html
    }
}

function toHTML(user:any):string {
    return `
    <li class="list-group-item">${user.name}</li>
  `
}

start()
