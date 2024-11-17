'use client';

import {
  LiveKitRoom,
  RoomAudioRenderer,
  VideoConference,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const roomId = params.roomId as string;
  const [username, setUsername] = useState<string | null>(null);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setUsername(searchParams.get('username'));
  }, [username]);

  const room = roomId;
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const resp = await fetch(`/api/get-participant-token?room=${room}&username=${username}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [room, username]);

  if (token === '') {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      <VideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}