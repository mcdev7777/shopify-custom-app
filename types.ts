
export interface Product {
  id: string;
  title: string;
  handle: string;
  status: 'active' | 'draft' | 'archived';
  inventoryQuantity: number;
  price: number;
  cost: number;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'paid' | 'pending' | 'refunded';
  createdAt: string;
  items: number;
}

export interface Workflow {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'enabled' | 'disabled';
}

export interface ChartData {
  name: string;
  sales: number;
  orders: number;
}
