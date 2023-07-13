import { Box, Button, Checkbox, Text } from '@palladxyz/ui'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'

import { WizardLayout } from '../../common/components'
import { FormLabel } from '../../common/components/FormLabel'
import { ViewHeading } from '../../common/components/ViewHeading'
import { useOnboardingStore } from '../../wallet/store/onboarding'

export const MnemonicWritedownView = () => {
  const navigate = useNavigate()
  const mnemonic = useOnboardingStore((state) => state.mnemonic?.split(' '))
  const [noOneIsLooking, setNoOneIsLooking] = useState(false)
  const [mnemonicWritten, setMnemonicWritten] = useState(false)
  const toggleMnemonicWrote = () => setMnemonicWritten(!mnemonicWritten)
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
              opacity: mnemonicWritten ? 1 : 0.5,
              transition: 'opacity 0.3s'
            }}
            disabled={!mnemonicWritten}
            onPress={() => navigate('/onboarding/confirmation')}
            testID="onboarding__nextButton"
          >
            Next
          </Button>
        </>
      }
    >
      <Box css={{ gap: 24 }}>
        <ViewHeading
          title="Write Down The Mnemonic"
          backButton={{ onPress: () => navigate(-1) }}
        />
        {noOneIsLooking ? (
          <Box css={{ gap: 16 }}>
            <FormLabel>Write This Down</FormLabel>
            <Box css={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {mnemonic?.map((word, i) => (
                <Text
                  key={i}
                  css={{
                    backgroundColor: '$secondary600',
                    color: '$white',
                    width: 'auto',
                    paddingHorizontal: '$md',
                    paddingVertical: '$sm',
                    borderRadius: 32,
                    fontSize: 14
                  }}
                  testID="onboarding__mnemonicWord"
                >
                  {word}
                </Text>
              ))}
            </Box>
            <Box css={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Checkbox
                value={mnemonicWritten}
                onValueChange={(value: boolean) => setMnemonicWritten(value)}
                testID="onboarding__mnemonicWrittenCheckbox"
              />
              <Pressable onPress={toggleMnemonicWrote}>
                <Text css={{ color: '$gray50' }}>
                  I have written down the mnemonic.
                </Text>
              </Pressable>
            </Box>
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
