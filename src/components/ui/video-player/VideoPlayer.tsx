import { FC } from 'react'
import { IVideoPlayer } from './video.interface'
import { useVideo } from './useVideo'
import { useAuth } from '@/hooks/useAuth'

import styles from './VideoPlayer.module.scss'
import cn from 'classnames'
import AuthPlaceholder from './auth-placeholder/AuthPlaceholder'
import { preload } from 'react-dom'
import MaterialIcon from '../MaterialIcon'


const VideoPlayer: FC<IVideoPlayer> = ({ videoSource, slug }) => {

	const { videoRef, actions, video } = useVideo()


	const { user } = useAuth()

	return (
		<div className={cn(styles.wrapper, { 'h-96': !user })}>
			{user ? (
				<>
					<video
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}#t=8`}
						preload="metadata"
					/>

				
					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						></div>
					</div>

			
					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>

							<button
								onClick={actions.toggleVideo}
								className={styles.playButton}
							>
								<MaterialIcon
									name={video.isPlaying ? 'MdPause' : 'MdPlayArrow'}
								/>
							</button>

							<button onClick={actions.fastForward}>
								<MaterialIcon name="MdUpdate" />
							</button>

							
							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(video.currentTime / 60) +
										':' +
										('0' + Math.floor(video.currentTime % 60)).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										('0' + Math.floor(video.videoTime % 60)).slice(-2)}
								</p>
							</div>
						</div>

						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</div>
	)
}

export default VideoPlayer
