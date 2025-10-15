import { LoginForm } from './components/login-form'
import MotionWrapper from '@/components/ui/motion-wrapper'

const LoginPage = () => {
  return (
    <MotionWrapper delay={0.1}>
      <div className="flex pt-12 items-center min-h-[34rem]">
        <LoginForm/>
      </div>
    </MotionWrapper>
  )
}

export default LoginPage