/**
 * In-House SMS Dispatcher using `client-sms-node` SDK
 *
 * Communicates with an in-house microservice (`service-sms`) using Pip.Services client-sms-node SDK
 * and maintains an in-memory cache for instant local testing.
 */

import { SmsCommandableHttpClientV1 } from 'client-sms-node';
import { ConfigParams } from 'pip-services3-commons-nodex';

// In-house memory cache for instant development & testing retrieval
export const inHouseOtpCache = new Map<string, { code: string; timestamp: number }>();

export async function sendSmsOtp(phoneNumber: string, code: string): Promise<void> {
  // Store OTP in local in-house memory cache for testing
  inHouseOtpCache.set(phoneNumber, {
    code,
    timestamp: Date.now(),
  });

  // Always output cleanly to the server console
  console.log('\n========================================');
  console.log(`🏠 [IN-HOUSE OTP DISPATCH via client-sms-node]`);
  console.log(`📱 Phone Number : ${phoneNumber}`);
  console.log(`🔑 Verification Code : ${code}`);
  console.log('========================================\n');

  try {
    // Connect to in-house Pip.Services SMS microservice if SMS_SERVICE_HOST is configured
    const smsHost = process.env.SMS_SERVICE_HOST;
    const smsPort = process.env.SMS_SERVICE_PORT || '8080';

    if (smsHost) {
      console.log(`📡 Connecting to service-sms at http://${smsHost}:${smsPort}...`);
      
      const client = new SmsCommandableHttpClientV1();
      client.configure(ConfigParams.fromTuples(
        'connection.protocol', 'http',
        'connection.host', smsHost,
        'connection.port', smsPort
      ));

      await client.open('crystal-stone-api');
      
      await client.sendMessage('crystal-stone-api', {
        to: phoneNumber,
        text: `Your Crystal Stone private portal verification code is: ${code}. Valid for 5 minutes.`,
      }, ConfigParams.fromTuples());

      await client.close('crystal-stone-api');
      console.log(`✅ SMS successfully dispatched via client-sms-node microservice to ${phoneNumber}`);
    }
  } catch (err) {
    console.error('❌ Error dispatching SMS via client-sms-node:', err);
  }
}
