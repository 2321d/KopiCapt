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
    }));

    Alpine.store('cart', {
        items: [], 
        total: 0, 
        quantity: 0,
        add(newItem) {
            // Cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // Jika belum ada, tambahkan barang ke cart
            if(!cartItem){
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;
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
// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style : 'currency',
        currency : 'IDR',
        minimumFractionDigits : 0
    }).format(number)
}