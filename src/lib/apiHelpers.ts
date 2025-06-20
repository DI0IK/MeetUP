import { NextAuthRequest } from 'next-auth';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import zod from 'zod/v4';
import { NextResponse } from 'next/server';

extendZodWithOpenApi(zod);

export function userAuthenticated(req: NextAuthRequest) {
  if (!req.auth || !req.auth.user || !req.auth.user.id)
    return {
      continue: false,
      response: { success: false, message: 'Not authenticated' },
      metadata: { status: 401 },
    } as const;
  return { continue: true, user: req.auth.user } as const;
}

export function returnZodTypeCheckedResponse<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Schema extends zod.ZodType<any, any, any>,
>(
  expectedType: Schema,
  response: zod.input<Schema>,
  metadata?: { status: number },
): NextResponse {
  const result = expectedType.safeParse(response);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid response format',
        errors: result.error.issues,
      },
      { status: 500 },
    );
  }
  return NextResponse.json(result.data, { status: metadata?.status || 200 });
}
