// alert('Hello, Async JS!');

async function greet() {
	const a = 5;

	try {
		var data = await promise;
	} catch (err) {
		console.error(err);
	}

	// ya söz tutulacak yada tutulmayacak ?
	promise
		.then((result) => {
			data = result;
			console.log('v2' + data.length * a);
		})
		.catch((err) => {
			console.error(err);
		});

	console.log(data.length * a);
	console.log(a);

	console.log('Hello, Sync JS!');
}

// ÖRNEK SENARYO: PROMİSE1 BİTİNCE pROMİSE2 ÇALIŞACAK
var promise = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() < 0.5) {
			reject(new Error('Promise rejected'));
			return;
		}

		resolve([
			{ id: 1, name: 'ali' },
			{ id: 2, name: 'can' },
		]);
	}, 1000);
});

var promise2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() < 0.5) {
			reject(new Error('Promise rejected'));
			return;
		}

		resolve([
			{ id: 1, name: 'ahmet' },
			{ id: 2, name: 'tan' },
		]);
	}, 1000);
});

// PROMİSE İLE THEN CATCH İLE ÇALIŞMANIN DEZAVANTAJI SIRALI ASENKRON KOD ÇAĞIRILARINDA PROMİSE CHAİN OLARAK PROMİSELERİ BİLEŞTİRMEMİZ LAZIM.

async function greetAsync() {
	setTimeout(() => {
		console.log('Hello after 1 second (Async)');
	}, 1000);
}

// greetAsync();
// greet();

async function runSequentialPromises() {
	try {
		const result1 = await promise;
		console.log('Promise 1 result:', result1);
		const result2 = await promise2;
		console.log('Promise 2 result:', result2);
	} catch (err) {
		console.error(err);
	}
}
// runSequentialPromises();

// 1. Yöntem Promise.ALL kullanımı

async function runParallelPromises() {
	try {
		const [result1, result2] = await Promise.all([promise, promise2]);
		console.log('Promise 1 result:', result1);
		console.log('Promise 2 result:', result2);
	} catch (err) {
		console.error(err);
	}
}
// runParallelPromises();

// 2. Yöntem Promise.race kullanımı (When All promises compete, first one to settle wins)
// Verilen Promise’lardan herhangi biri başarıyla sonuçlandığında veya hata ile sonuçlandığında (reddedildiğinde), sonuçlanan Promise’ın durumuna göre tamamlanan bir Promise oluşturur.
async function runRacePromises() {
	try {
		const result = await Promise.race([promise, promise2]);
		console.log('Race result:', result);
	} catch (err) {
		console.error(err);
	}
}
// runRacePromises();

// 3. Yöntem Promise.any kullanımı (First fulfilled promise wins) -> C# da yok javascript özgü bir olay.
// Promise.any() fonksiyonu, verilen promise’lardan ilk başarıyla sonuçlanan (fulfilled) promise’ın sonucuyla tamamlanan bir Promise döndürür. Eğer verilen promise’ların tamamı başarısız olursa (rejected), tüm reddedilme nedenlerini içeren bir diziyle birlikte AggregateError hatası fırlatır.
async function runAnyPromises() {
	try {
		const result = await Promise.any([promise, promise2]);
		console.log('Any result:', result);
	} catch (err) {
		console.error(err);
	}
}
// runAnyPromises();

// Promise Chain kullanımı (Sıralı asenkron işlemler için)
// promise
// 	.then((result1) => {
// 		console.log('Promise 1 result (Chain):', result1);
// 		return promise2;
// 	})
// 	.then((result2) => {
// 		console.log('Promise 2 result (Chain):', result2);
// 		// return promise;
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// fetch('https://jsonplaceholder.typicode.com/todos')
// 	.then((response) => response.json())
// 	.then((data) => {
// 		console.log('Fetched todos:', data);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// await yapıları async fonksiyonlar içinde kullanılır. Asenkron işlemleri daha okunabilir bir şekilde yönetmemizi sağlar.
async function fetchTodos() {
	const todos = await fetch('https://jsonplaceholder.typicode.com/todos');
	const todosData = await todos.json();
	console.log('Fetched todos (await):', todosData);
}
fetchTodos();
