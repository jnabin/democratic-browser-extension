import { CreditModel } from "./credit.model"
import { OrganizationModel } from "./organization.model"
import { UserModel } from "./user.model"

export interface SigninRes {
    status: string,
    message: string,
    data: {
      token:string,
      role_id:number,
      title:string,
      status:string,
      stripe_pk:string,
      stripe_client:string,
      plivo_username:string,
      plivo_password:string,
      plivo_endpoint_id:string,
      user_id:number,
      organization_id:number,
      credits:CreditModel[],
      user:UserModel,
      organization:OrganizationModel
    }
  }