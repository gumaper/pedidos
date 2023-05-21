import { AfterViewInit, Component, EventEmitter, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pedido';

  form: FormGroup = new FormGroup({});

  clienteForm: FormGroup = new FormGroup({});

  pedido: string = '000' + Math.floor(Math.random() * 65536).toString();

  dataHoje: Date = new Date();

  clienteNome: FormControl = new FormControl();

  public isEditing: boolean = false;
  public pendingValue: string = '';
  public value!: string;
  public valueChangeEvents: EventEmitter<string> = new EventEmitter<string>();

  gerandoPdf: boolean = false;

  cliente: any = {
    nome: 'Cliente nome/empresa',
    numero: '312312321',
    endereco: 'Rua tal',
    cidade: 'Chapadão do Sul - MS',
    cep: '79560-000',
  };

  mercadoriasLM: any[] = [
    {
      codigo: '001987',
      descricao: 'LM 200 1/10',
      unid: 'UN',
      quantidade: 1,
      valor: 530,
    },
    {
      codigo: '001988',
      descricao: 'LM 50 1/10',
      unid: 'UN',
      quantidade: 1,
      valor: 140,
    },
    {
      codigo: '001989',
      descricao: 'LM 20 1/10',
      unid: 'UN',
      quantidade: 1,
      valor: 60,
    },
    {
      codigo: '001990',
      descricao: 'LM 05 1/10',
      unid: 'UN',
      quantidade: 1,
      valor: 15,
    },
    {
      codigo: '001993',
      descricao: 'LM 200 1/100',
      unid: 'UN',
      quantidade: 1,
      valor: 2100,
    },
    {
      codigo: '001994',
      descricao: 'LM 50 1/100',
      unid: 'UN',
      quantidade: 1,
      valor: 600,
    },
    {
      codigo: '001995',
      descricao: 'LM 20 1/100',
      unid: 'UN',
      quantidade: 1,
      valor: 245,
    },
    {
      codigo: '001996',
      descricao: 'LM 05 1/100',
      unid: 'UN',
      quantidade: 1,
      valor: 65,
    },
    {
      codigo: '001997',
      descricao: 'LM 02 1/100',
      unid: 'UN',
      quantidade: 1,
      valor: 25,
    },
  ];

  mercadoriasShampoo: any[] = [
    {
      codigo: '001998',
      descricao: 'Shampoo 200 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 430,
    },
    {
      codigo: '001999',
      descricao: 'Shampoo 50 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 110,
    },
    {
      codigo: '002000',
      descricao: 'Shampoo 20 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '002001',
      descricao: 'Shampoo 05 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 12,
    },
    {
      codigo: '002002',
      descricao: 'Shampoo 200 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 940,
    },
    {
      codigo: '002003',
      descricao: 'Shampoo 50 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 250,
    },
    {
      codigo: '002004',
      descricao: 'Shampoo 20 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 105,
    },
    {
      codigo: '002005',
      descricao: 'Shampoo 05 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 30,
    },
    {
      codigo: '002006',
      descricao: 'Shampoo 02 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 12,
    },
    {
      codigo: '002007',
      descricao: 'Shampoo 200 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 2050,
    },
    {
      codigo: '002008',
      descricao: 'Shampoo 50 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 490,
    },
    {
      codigo: '002009',
      descricao: 'Shampoo 20 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 210,
    },
    {
      codigo: '002010',
      descricao: 'Shampoo 05 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 60,
    },
    {
      codigo: '002011',
      descricao: 'Shampoo 02 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 25,
    },
  ];

  mercadoriasSolupan: any[] = [
    {
      codigo: '002012',
      descricao: 'Solupan 200 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 430,
    },
    {
      codigo: '002013',
      descricao: 'Solupan 50 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 110,
    },
    {
      codigo: '002014',
      descricao: 'Solupan 20 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '002015',
      descricao: 'Solupan 05 1x10',
      unid: 'UN',
      quantidade: 1,
      valor: 12,
    },
    {
      codigo: '002016',
      descricao: 'Solupan 200 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 940,
    },
    {
      codigo: '002017',
      descricao: 'Solupan 50 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 250,
    },
    {
      codigo: '002018',
      descricao: 'Solupan 20 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 105,
    },
    {
      codigo: '002019',
      descricao: 'Solupan 05 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 30,
    },
    {
      codigo: '002020',
      descricao: 'Solupan 02 1x40',
      unid: 'UN',
      quantidade: 1,
      valor: 12,
    },
    {
      codigo: '002021',
      descricao: 'Solupan 200 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 2050,
    },
    {
      codigo: '002022',
      descricao: 'Solupan 50 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 490,
    },
    {
      codigo: '002023',
      descricao: 'Solupan 20 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 210,
    },
    {
      codigo: '002024',
      descricao: 'Solupan 05 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 60,
    },
    {
      codigo: '002025',
      descricao: 'Solupan 02 1x100',
      unid: 'UN',
      quantidade: 1,
      valor: 25,
    },
  ];

  items: any[] = [];

  total: any = {
    sub: 0,
    desconto: 0,
    acrecimo: 0,
    servico: 0,
    total: 0,
  };

  observacao: string = 'Digite a descrição';

  valorTotalItems: number = 0;

  adicionarItem() {
    this.items.push({
      codigo: '1',
      descricao: 'descricao',
      unid: 'UN',
      quantidade: 1,
      valor: 50,
    });
  }

  constructor(private _formBuilder: FormBuilder) {}

  // ---
  // PUBLIC METHODS.
  // ---

  // I cancel the editing of the value.
  public cancel(): void {
    this.isEditing = false;
  }

  // I enable the editing of the value.
  public edit(): void {
    this.pendingValue = this.value;
    this.isEditing = true;
  }

  // I process changes to the pending value.
  public processChanges(): void {
    // If the value actually changed, emit the change but don't change the local
    // value - we don't want to break unidirectional data-flow.
    if (this.pendingValue !== this.value) {
      this.valueChangeEvents.emit(this.pendingValue);
    }

    this.isEditing = false;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({});

    this.clienteForm = this._formBuilder.group({
      nome: ['Nome empresa/cliente'],
      endereco: [''],
      email: [''],
      contato: [''],
    });

    this.calcSubTotal();
  }

  gerarPDF() {
    if (this.gerandoPdf) return;

    this.gerandoPdf = true;

    setTimeout(() => {
      const doc = new jsPDF('p', 'pt', 'a4', true);
      const divToPrint = document.getElementById('pdf') as any;

      html2canvas(divToPrint).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4', true);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 270, '', 'FAST');
        pdf.save(this.pedido + '.pdf');

        // const pdfBlob = pdf.output('blob');
        // const blobUrl = URL.createObjectURL(pdfBlob);

        // const iframe = document.createElement('iframe');
        // iframe.src = blobUrl;
        // iframe.width = '100%';
        // iframe.height = '600px';

        // const previewContainer = document.getElementById('preview-container');
        // previewContainer?.innerHTML = '';
        // previewContainer?.appendChild(iframe);
      });

      setTimeout(() => {
        this.gerandoPdf = false;
      }, 5000);
    }, 1000);
  }

  onSelectMercadoria(mercadoria: any, tipo: number) {
    if (mercadoria.target.value >= 0) {
      if (tipo === 1)
        this.items.push(this.mercadoriasLM[mercadoria.target.value]);
      if (tipo === 2)
        this.items.push(this.mercadoriasShampoo[mercadoria.target.value]);
      if (tipo === 3)
        this.items.push(this.mercadoriasSolupan[mercadoria.target.value]);

      this.calcSubTotal();
    }
  }

  public saveProjectName(
    objeto: string,
    tipo: string,
    novoValor: string,
    indice: number
  ): void {
    this.calcSubTotal();
    if (novoValor && objeto === 'cliente') this.cliente[tipo] = novoValor;

    if (novoValor && objeto === 'item') {
      this.items[indice][tipo] = novoValor;

      this.calcSubTotal();
    }

    if (novoValor && objeto === 'total') {
      this.total.total = 0;
      this.total[tipo] = parseFloat(novoValor);

      this.calcSubTotal();
    }
    if (novoValor && objeto === 'pedido') this.pedido = novoValor;

    if (novoValor && objeto === 'observacao') this.observacao = novoValor;
  }

  removeItem(indice: number) {
    this.items.splice(indice, 1);

    this.calcSubTotal();
  }

  calcSubTotal() {
    this.valorTotalItems = 0;

    this.items.forEach(
      (el) => (this.valorTotalItems += el.quantidade * el.valor)
    );

    let total: number =
      this.total.acrecimo + this.total.servico + this.valorTotalItems;

    this.total.total = total - (total * this.total.desconto) / 100;
  }
}
