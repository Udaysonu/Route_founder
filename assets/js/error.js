#include<bits/stdc++.h>
using namespace std;

#define IOS ios::sync_with_stdio(0); cin.tie(0); cout.tie(0);
#define int               long long
#define endl              "\n"
#define pb                push_back
#define ppb               pop_back
#define pf                push_front
#define ppf               pop_front
#define all(x)            (x).begin(),(x).end()
#define uniq(v)           (v).erase(unique(all(v)),(v).end())
#define sz(x)             (int)((x).size())
#define fr                first
#define sc                second
#define pii               pair<int,int>
#define vi                vector<int>
#define vpi               vector<pair<int,int>>
#define mii               map<int,int>
#define rep(i,a,b)        for(int i=a;i<b;i++)
#define repe(i,a,b)        for(int i=a;i<=b;i++)
#define mem1(a)           memset(a,-1,sizeof(a))
#define mem0(a)           memset(a,0,sizeof(a))
#define ppc               __builtin_popcount
#define ppcll             __builtin_popcountll
#define INF 100000000000000000
#define mod 1000000007
#define esp 10e-7

 
int store[mx];
void check_typo1(stack<char>&st)
{
  if(st.size()<3)
    return;
  char ch[3];
  for(int i=0;i<3;i++)
  {
    ch[i]=st.top();
    st.pop();
  }
  if(ch[0]==ch[1]&&ch[1]==ch[2])
  {
    for(int i=1;i>=0;i--)
      st.push(ch[i]);
  }else
  {
    for(int i=2;i>=0;i--)
      st.push(ch[i]);
  }
}
void check_typo2(stack<char>&st)
{
   if(st.size()<=3)
    return;
   char a[2];
   a[0]=st.top();
   st.pop();
   a[1]=st.top();
   st.pop();
   char b[2];
   b[0]=st.top();
   st.pop();
   b[1]=st.top();
   st.pop();
   if(a[0]==a[1]&&b[0]==b[1])
   {
     for(int i=1;i>=0;i--)
      st.push(b[i]);
     st.push(a[0]);
   }else
   {
     st.push(b[1]);
     st.push(b[0]);
     st.push(a[1]);
     st.push(a[0]);
   }
}
// seive of erithros algorithm is available in internet
// source is geeksforgeeks so if you find my solution similar to others then
// please don't send me strike it is available in internet
// credits : GEEKSFORGEEKS
void solve()
{
    int arr[32];
    bool pp[mx];
      int a=3;
    bool baku[100];
    memset(pp, true, sizeof(pp));
    vector<int>temp;
    for (int p = 2; p * p < mx; p++)
    {
        if (pp[p] == true)
        {
            for(int i=0;i<2;i++)
            {
                a++;
            }
            if(a<10)
            {
                baku[0]=true;
            }
            for (int i = p * p; i < mx; i += p)
            {
                pp[i] = false;
            }
        }

    }

    for(int i=0;i<2;i++)
    {
        if(a==1)
        {
            baku[1]=false;
        }
        a++;
    }
    for (int p = 2; p < mx; p++)
    {
        if (pp[p])
            temp.push_back(p);
    }
    if(a==32)
        baku[3]=false;
    auto it = temp.begin();
    int count = 0;
    for (int i = 0; i < mx; i++)
    {
        if(*it <= i)
        {
            ++it;
            ++count;
        }
        store[i] = count;
    }
    for(int i=0;i<10;i++)
    {
        a++;
        if(a%2==0)
        {
            baku[a%50]=true;
        }
        else{
            baku[a%10]=false;
        }
    }
    for(int i=0;i<2;i++)
    {
        a++;
    }
}
const int MaxN=1<<19,M=998244353;

int mod=998244353;

int ws[MaxN];

int inverse_factorial[500005];

int book_keeping[500005];

int factorial[500005];

int gpa[1<<19], gpb[1<<19];

long long binpow(long long a, long long b=mod-2, long long m=mod) {

    a %= m;

    long long res = 1;

    while (b > 0) {

        if (b & 1)

            res = res * a % m;

        a = a * a % m;

        b >>= 1;

    }

    return res;

}

void fourier(int *a,int n,int f=0){

    int i,j,k,m,u,v,w,wm;

    for(i=n>>1,j=1,k;j<n-1;j++){

        if(i>j)swap(a[i],a[j]);

        for(k=n>>1;k<=i;k>>=1)i^=k;i^=k;

    }

    for(m=2;m<=n;m<<=1)

        for(i=0,wm=binpow(3,f==1?(M-1)/m:(M-1)/m*(m-1),M);i<n;i+=m)

            for(j=i,w=1;j<i+(m>>1);j++){

                u=a[j],v=1ll*w*a[j+(m>>1)]%M;

                if((a[j]=u+v)>=M)a[j]-=M;

                if((a[j+(m>>1)]=u-v)<0)a[j+(m>>1)]+=M;

                w=1ll*w*wm%M;
            }
    if(f==1)for(w=binpow(n,M-2,M),i=0;i<n;i++)a[i]=1ll*a[i]*w%M;
}


vector<int> mul(vector<int> arr,vector<int> brr){

    int n_a=arr.size()-1;

    int n_b=brr.size()-1;

    int n_final=1;

    while(n_final<=n_a+n_b)n_final*=2;

    int i = 0;

    while(i<n_final){

        gpa[i] = i<=n_a?arr[i]:0;

        i++;

    }

    i=0;

    while(i<n_final){

        gpb[i] = i<=n_b?brr[i]:0;

        i++;

    }

    fourier(gpb, n_final);

    fourier(gpa, n_final);

    i=0;

    while(i<n_final){

        gpa[i]=gpa[i]*gpb[i]%M;

        i++;

    }

    fourier(gpa,n_final,1);

    vector<int> c;

    i=0;

    while(i<=(n_a+n_b)){

        c.push_back(gpa[i]);

        i++;

    }

    return c;

}

int nCr(int n, int r){

    if(r>n)return 0;

    return (((inverse_factorial[r]*inverse_factorial[n-r])%mod)*factorial[n])%mod;

}

void sssolve(){

    inverse_factorial[1]=inverse_factorial[0]=1;

    book_keeping[1]=book_keeping[0]=1;

    factorial[1]=factorial[0]=1;

    for(int i=2;i<200005;i++){

        book_keeping[i] = book_keeping[mod%i]*(mod-mod/i)%mod;

    }

    for(int i=2;i<200005;i++){

        factorial[i]=(factorial[i-1]*i)%mod;

    }

    for(int i=2;i<200005;i++){

        inverse_factorial[i]=(book_keeping[i]*inverse_factorial[i-1])%mod;

    }

}

signed main(){

    sssolve();

    int n;

    scanf("%lld",&n);

    vector<int> arr(n);

    vector<int> book_keeping(30);

    for(int i=0;i<n;i++){

        scanf("%lld",&arr[i]);

    }

    for(int i=0;i<n;i++){

        for(int j=0;j<30;j++){

            if(arr[i]&(1<<j)){

                book_keeping[j]++;

            }

        }

    }

    vector<int> sol(n+1);

    for(int ii=0;ii<30;ii++){

        vector<int> eno={0};

        vector<int> orez={1};

        for(int i=1;i<=book_keeping[ii];i+=2){

            eno.push_back(nCr(book_keeping[ii], i));

            eno.push_back(0);

        }

        int i=1;

        while(i<=(n-book_keeping[ii])){

            orez.push_back(nCr(n-book_keeping[ii], i));;

            i++;

        }

        auto gotit=mul(eno, orez);

        i=0;

        while(i<=n){

            sol[i]=(sol[i]+((1<<ii)*gotit[i]))%mod;;

            i++;

        }

    }

    int i=1;

    while(i<=n){

        sol[i]+=sol[i-1];

        sol[i]%=mod;

        i++;    

    }

    int q;

    scanf("%lld",&q);

    while(q--){

        int g;

        scanf("%lld",&g);

        printf("%lld\n",sol[g]);

    }

}