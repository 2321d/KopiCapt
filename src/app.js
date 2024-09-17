document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items : [
            {id: 1, name: 'Robusta Brazil', img:'1.jpg', price: 20000},
            {id: 2, name: 'Arabica Blend', img:'2.jpg', price: 25000},
            {id: 3, name: 'Primo Passo', img:'3.jpg', price: 30000},
            {id: 4, name: 'Magnolia', img:'4.jpg', price: 35000},  
            {id: 5, name: 'Early Bird', img:'5.jpg', price: 40000},
            {id: 6, name: 'Buna Coffee', img:'6.jpg', price: 45000},
        ],
        menus: [
            {id: 7, name: 'Cappuccino', img: 'capuccino.jpeg', price: 10000},
            {id: 8, name: 'Espresso', img: 'espresso.png', price: 10000},
            {id: 9, name: 'Americano', img: 'americano.jpeg', price: 15000},
            {id: 10, name: 'Latte', img: 'latte.jpeg', price: 15000},
            {id: 11, name: 'Mocha', img: 'mocha.jpeg', price: 20000},
            {id: 12, name: 'Afogatto', img: 'afogatto.jpeg', price: 20000},
            {id: 13, name: 'Matcha', img: 'matcha.jpeg', price: 25000},
            {id: 14, name: 'Flatwhite', img: 'machiatto.jpg', price: 25000},
        ],
    }));
    
    Alpine.store('cart', {
        items: [], 
        total: 0, 
        quantity: 0,
        add(newItem) {
            // Cek ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // Jika belum ada, tambahkan barang ke cart
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
                swal("Good job!", "Barang ditambahkan ke keranjang", "success");
            } else {
                // Jika barang sudah ada, tambahkan quantity dan subtotal
                this.items = this.items.map((item) => {
                    if(item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id) {
            // Ambil item yang akan dihapus berdasarkan id
            const cartItem = this.items.find((item) => item.id === id);

            // Jika item lebih dari 1, kurangi quantity dan subtotal
            if(cartItem && cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else {
                // Jika item hanya 1, hapus item dari cart
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
    });
});

const checkoutButton = document.querySelector('.checkout-button');
const form = document.querySelector('#checkoutForm');

//kirim data kalau cekout ditekn
checkoutButton.addEventListener('click', function(e){
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    const url = "https://web.whatsapp.com/send?phone=6281529463925&text=" + encodeURIComponent(message);
    window.open(url, '_blank');
});

//format pesan wa
const formatMessage = (obj) => {
    return `Data Customer :
  - Nama : ${obj.name}
  - Email : ${obj.email}
  - No Hp : ${obj.phone}

data Pesanan :
${JSON.parse(obj.items).map(item => `  - ${item.name} (${item.quantity} x ${rupiah(item.total)})`).join('\n')}
TOTAL: ${rupiah(obj.total)}
Terima Kasih.;`
    
}

// pake rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style : 'currency',
        currency : 'IDR',
        minimumFractionDigits : 0
    }).format(number)
}


//anjj capek
