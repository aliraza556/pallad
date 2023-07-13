import { validateMnemonic, wordlist } from '@palladxyz/key-generator'
import { Box, Button, Textarea } from '@palladxyz/ui'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-native'

import { WizardLayout } from '../../common/components'
import { FormLabel } from '../../common/components/FormLabel'
import { ViewHeading } from '../../common/components/ViewHeading'
import { useWallet } from '../../wallet/hooks/useWallet'
import { useAppStore } from '../../wallet/store/app'
import { useOnboardingStore } from '../../wallet/store/onboarding'

export const MnemonicInputView = () => {
  const { wallet } = useWallet()
  console.log(wallet)
  const navigate = useNavigate()
  const walletName = useOnboardingStore((state) => state.walletName)
  const setVaultStateInitialized = useAppStore(
    (state) => state.setVaultStateInitialized
  )
  const [noOneIsLooking, setNoOneIsLooking] = useState(false)
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      mnemonic: ''
    }
  })
  const mnemonic = watch('mnemonic')
  const mnemonicValid = useMemo(
    () => validateMnemonic(mnemonic, wordlist),
    [mnemonic]
  )
  const onSubmit = async ({ mnemonic }: { mnemonic: string }) => {
    if (!walletName) return
    console.log('>>>MN', mnemonic)
    await setVaultStateInitialized()
    return navigate('/onboarding/finish')
  }
  return (
    <WizardLayout
      footer={
        <>
          <Button
            onPress={() => navigate(-1)}
            css={{ flex: 1, width: 'auto' }}
            testID="onboarding__backButton"
          >
            Back
          </Button>
          <Button
            variant="secondary"
            css={{
              flex: 1,
              width: 'auto',
              opacity: mnemonicValid ? 1 : 0.5,
              transition: 'opacity 0.3s'
            }}
            disabled={!mnemonicValid}
            onPress={handleSubmit(onSubmit)}
            testID="onboarding__nextButton"
          >
            Next
          </Button>
        </>
      }
    >
      <Box css={{ gap: 24 }}>
        <ViewHeading
          title="Type In Your Mnemonic"
          backButton={{ onPress: () => navigate(-1) }}
        />
        {noOneIsLooking ? (
          <Box css={{ gap: 16 }}>
            <FormLabel>Your Mnemonic</FormLabel>
            <Controller
              control={control}
              name="mnemonic"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  css={{
                    color: '$white',
                    borderColor: '$gray600',
                    backgroundColor: '$gray800',
                    lineHeight: '175%'
                  }}
                  testID="onboarding__yourMnemonicTextarea"
                />
              )}
            />
          </Box>
        ) : (
          <Box css={{ gap: 8 }}>
            <FormLabel>Confirm No One Is Behind You</FormLabel>
            <Button
              onPress={() => setNoOneIsLooking(true)}
              testID="onboarding__confirmAlone"
            >
              I am alone
            </Button>
          </Box>
        )}
      </Box>
    </WizardLayout>
  )
}
