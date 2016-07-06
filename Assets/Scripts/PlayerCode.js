#pragma strict

import UnityEngine.Animation;

public var MaxTime : float = 0.75f;
public var anim : Animator;
private var t : float = 0.0f;
private var timesHit : float = 0.0f;

function Start () {

}

function Update () {
	if (Input.GetKeyDown(KeyCode.E)) {
	//	Animator.SetTrigger("atk");
	}
	if (Input.GetKeyDown(KeyCode.Space)) {
	//	Animator.SetTrigger("jmp");
	}

	if (Input.GetButtonDown("Fire1") && t < MaxTime) {
		if (Input.GetButtonDown("Fire1") && t < MaxTime) {
			t = 0;
			anim.SetTrigger("ComboAttack");
		}
		else {
			t = 0;
		}
	}
	t += Time.deltaTime;
}

function OnCollisionEnter(col : Collision) {
	if (col.gameObject.tag == "Sword") {
		++timesHit;
		Debug.Log("YOU DIED - " +  timesHit);
	}
}