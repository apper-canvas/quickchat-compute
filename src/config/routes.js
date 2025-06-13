import ChatsPage from '@/components/pages/ChatsPage'
import StatusPage from '@/components/pages/StatusPage'
import ContactsPage from '@/components/pages/ContactsPage'
import ChatDetailPage from '@/components/pages/ChatDetailPage'
import StatusDetailPage from '@/components/pages/StatusDetailPage'

export const routes = [
  {
    id: 'chats',
    label: 'Chats',
    path: '/chats',
    icon: 'MessageCircle',
    component: ChatsPage
  },
  {
    id: 'status',
    label: 'Status',
    path: '/status',
    icon: 'Circle',
    component: StatusPage
  },
  {
    id: 'contacts',
    label: 'Contacts',
    path: '/contacts',
    icon: 'Users',
    component: ContactsPage
  },
  {
    id: 'chat-detail',
    path: '/chat/:chatId',
    component: ChatDetailPage,
    hideInNav: true
  },
  {
    id: 'status-detail',
    path: '/status/:storyId',
    component: StatusDetailPage,
    hideInNav: true
  }
]

export default routes