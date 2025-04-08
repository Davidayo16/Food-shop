import { create } from "zustand"

// Types
export interface Order {
  id: string
  date: string
  status: string
  pending?: boolean
}

export interface Review {
  id: string
  text: string
  rating: number
  count: number
}

export interface Tracking {
  id: string
  date: string
  status: string
}

export interface Notification {
  id: number
  orderId: string
  type: string
  read: boolean
}

interface DashboardState {
  income: number
  orders: number
  deliveryRequests: number
  activeDeliveries: Order[]
  recentReviews: Review[]
  allOrders: Order[]
  trackings: Tracking[]
  notifications: Notification[]
  totalIncome: number

  // Actions
  incrementIncome: (amount: number) => void
  incrementOrders: (count: number) => void
  updateDeliveryRequests: (count: number) => void
  addOrder: (order: Order) => void
  addNotification: (notification: Notification) => void
  markNotificationAsRead: (id: number) => void
  withdrawAmount: (amount: number) => void
}

// Create store
export const useDashboardStore = create<DashboardState>((set) => ({
  income: 380000,
  orders: 615,
  deliveryRequests: 3,
  activeDeliveries: [
    { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "In Transit" },
    { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Pickup", pending: true },
    { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Start Now" },
  ],
  recentReviews: [
    { id: "QF3348", text: "The driver was fast", rating: 4.5, count: 28 },
    { id: "QF1112", text: "I love the service, it was..", rating: 4.5, count: 28 },
  ],
  allOrders: [
    { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Delivered" },
    { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Delivered" },
    { id: "QF3384", date: "14th Mar, 2024 - 12:03PM", status: "Delivered" },
  ],
  trackings: [
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Assigned" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "In Transit" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
    { id: "TNQF3324", date: "Oct 4, 2024", status: "Delivered" },
  ],
  notifications: [
    { id: 1, orderId: "QF3348", type: "New Delivery Request", read: false },
    { id: 2, orderId: "QF11348", type: "New Delivery Request", read: false },
  ],
  totalIncome: 398.0,

  // Actions
  incrementIncome: (amount) => set((state) => ({ income: state.income + amount })),
  incrementOrders: (count) => set((state) => ({ orders: state.orders + count })),
  updateDeliveryRequests: (count) => set((state) => ({ deliveryRequests: count })),
  addOrder: (order) => set((state) => ({ allOrders: [order, ...state.allOrders] })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      deliveryRequests: state.deliveryRequests + 1,
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    })),
  withdrawAmount: (amount) => set((state) => ({ totalIncome: state.totalIncome - amount })),
}))

// Setup real-time simulation
export function setupRealTimeSimulation() {
  // Simulate income increases
  setInterval(() => {
    useDashboardStore.getState().incrementIncome(Math.floor(Math.random() * 1000))
  }, 5000)

  // Simulate new orders
  setInterval(() => {
    if (Math.random() > 0.7) {
      useDashboardStore.getState().incrementOrders(1)

      const newOrder = {
        id: `QF${Math.floor(1000 + Math.random() * 9000)}`,
        date: "14th Mar, 2024 - 12:03PM",
        status: "Delivered",
      }

      useDashboardStore.getState().addOrder(newOrder)
    }
  }, 10000)

  // Simulate new notifications
  setInterval(() => {
    if (Math.random() > 0.7) {
      const newNotification = {
        id: Date.now(),
        orderId: `QF${Math.floor(10000 + Math.random() * 90000)}`,
        type: "New Delivery Request",
        read: false,
      }

      useDashboardStore.getState().addNotification(newNotification)
    }
  }, 15000)
}

