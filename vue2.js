let vue = new Vue({
    el: '#app',
  data: {
    image: [],
    base:''
  },
  methods: {
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      console.log(files)
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    

    var testArray = [];
    for (let i = 0; i < files.length; ++i) {
        testArray.push(await toBase64(files[i]));
    }
    console.log(testArray);
    var doc = new jsPDF();
    for (let i = 0; i < testArray.length; ++i) {
        doc.addImage(testArray[i], 'jpg' || 'png' || 'jpeg', 15, 40, 180, 230);
        if (i < testArray.length - 1) {
            doc.addPage();
        } else {
            console.log('done');
        }
    }
    doc.save('Test.pdf');


    },
  
  }

})

