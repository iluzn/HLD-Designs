import java.util.*;

class Solution {
    public String reverseVowels(String s) {
        String v = "aeiouAEIOU";
        char[] a = s.toCharArray();
        int l = 0, r = a.length - 1;
        while (l < r) {
            if (v.indexOf(a[l]) < 0) l++;
            else if (v.indexOf(a[r]) < 0) r--;
            else { char t = a[l]; a[l] = a[r]; a[r] = t; l++; r--; }
        }
        return new String(a);
    }
}
public class Main{public static void main(String[] a){Scanner sc=new Scanner(System.in);int T=Integer.parseInt(sc.nextLine().trim());StringBuilder sb=new StringBuilder();for(int i=0;i<T;i++){String s=sc.hasNextLine()?sc.nextLine():"";sb.append(new Solution().reverseVowels(s)).append("\n");}System.out.print(sb);}}