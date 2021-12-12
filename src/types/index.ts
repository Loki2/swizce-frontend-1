export type Roles = 'CLIENT'| 'ITEMEDITOR' | 'ADMIN' | 'SUPERADMIN'

export interface User {
  id: string,
  username: string,
  email: string,
  images: string,
  covers: string,
  roles: Roles[],
  createdAt: string
}

export interface UserScream {
    id: string,
    imageUrl: string,
    description: string,
    likes: number,
    shares: number,
    status: string,
    createdAt: Date,
    comments: {
      id: string,
      description: string,
      user: {
        id: string,
        username: string,
        images: string
      }
      recomments: {
        id: string,
        description: string
        user:  {
          id: string,
          username: string,
          images: string
        }
      }
    }
  }

export interface Profile {
  id: string,
  username: string,
  email: string,
  profile: {
    id: string,
    firstname: string,
    lastname: string,
    bios: string,
    age: string,
    birthdate: string,
    gender: string,
    mentalStatus: string,
    profileUrl: string,
    coverUrl: string,
    createdAt: string
  }
}

export interface Scream {
  id: string,
  imageUrl: string,
  videoUrl: string,
  description: string,
  likes: number,
  shares: number,
  status: string,
  createdAt: Date,
  user: User
}



export interface Service {
  id: string,
  name: string,
  description: string,
  contact: string,
  address: string,
  imageUrl: string,
  status: string,
  tags: string,
  user: User
}

export interface Song {
  id: string,
  name: string,
  alblum: string
  artist: string,
  genre: string,
  imageUrl: string,
  fileUrl: string
}


export interface Service {
		id: string,
    name: string,
    description: string,
    price: number,
    address: string,
    contact: string,
    tags: string,
    imageUrl: string,
    logoUrl: string
}


export type SignupArgs = Pick<User, 'username' | 'email'> & { password: string }

export type SigninArgs = Omit<SignupArgs, 'username'>

export type CreateScreamArgs = Pick<Scream, 'description' | 'imageUrl'>

export type CreateServiceArg = Pick<Service, 'name' | 'description' | 'contact' | 'address' | 'tags' | 'imageUrl'>
